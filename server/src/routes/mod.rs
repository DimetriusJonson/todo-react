use axum::{
    Router,
    extract::FromRef,
    middleware::{self},
    routing::{delete, get, get_service, patch, post},
};
use sea_orm::DatabaseConnection;
use tower_http::{cors::CorsLayer, services::{ServeDir, ServeFile}, trace::TraceLayer};

use crate::routes::check_middleware::{check_auth_token, check_json_accept};

pub mod check_middleware;
pub mod tasks_route;
pub mod users_route;

#[derive(Clone, FromRef)]
struct AppState {
    db_conn: DatabaseConnection,
}

pub async fn create_routes(db_conn: DatabaseConnection, client_dir: &str) -> Router {
    let app_state = AppState { db_conn };

    let static_files_service = ServeDir::new(format!("{}/static", client_dir));
    let fallback_serve_dir = ServeDir::new(client_dir)
        .not_found_service(ServeFile::new(format!("{}/index.html", client_dir)));

    Router::new()
        .nest_service("/static", static_files_service)
        .route("/favicon.ico", get_service(ServeFile::new(format!("{}/favicon.ico", client_dir))))
        .route("/manifest.json", get_service(ServeFile::new(format!("{}/manifest.json", client_dir))))
        .route("/logo192.png", get_service(ServeFile::new(format!("{}/logo192.png", client_dir))))
        .route("/logo512.png", get_service(ServeFile::new(format!("{}/logo512.png", client_dir))))
        .nest(
            "/api/v1",
            Router::new()
                .route("/tasks", get(tasks_route::tasks))
                .route("/tasks/{id}", get(tasks_route::task))
                .route("/tasks", post(tasks_route::create_task))
                .route("/tasks/{id}", patch(tasks_route::update_task))
                .route("/tasks/{id}", delete(tasks_route::delete_task))
                .route("/users/logout", get(users_route::logout))
                .route_layer(middleware::from_fn_with_state(app_state.clone(), check_auth_token))
                .route("/health_check", get(users_route::health_check))
                .route("/users/login", post(users_route::login))
                .route("/users", post(users_route::create_user))
                .route("/users", get(users_route::users))
                .route_layer(middleware::from_fn(check_json_accept))
                .layer(CorsLayer::permissive()),
        )
        .fallback_service(fallback_serve_dir)
        .layer(TraceLayer::new_for_http())
        .with_state(app_state)
}
