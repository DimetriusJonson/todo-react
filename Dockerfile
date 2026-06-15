############ Build server
FROM rust:1.94.0-alpine3.23 AS builder

RUN apk add --no-cache musl-dev openssl-dev openssl-libs-static

WORKDIR /root

COPY server/Cargo.toml server/Cargo.lock ./server/

RUN mkdir -p server/src && echo "fn main() {}" > server/src/main.rs

WORKDIR /root/server
RUN cargo build --release --target x86_64-unknown-linux-musl && rm -rf src 

WORKDIR /root

COPY server/src ./server/src

WORKDIR /root/server
RUN touch src/main.rs && cargo build --release --target x86_64-unknown-linux-musl
WORKDIR /root

############ Additional compression with UPX
FROM alpine:3.19 AS compressor
RUN apk add --no-cache upx

COPY --from=builder /root/server/target/x86_64-unknown-linux-musl/release/server /server
RUN upx --best --lzma /server

############## Stage : Build client
FROM node:20-alpine AS builder-client
WORKDIR /root

RUN npm install

COPY src/ ./src
COPY public/ ./public
COPY package.json ./

RUN npm run build

############# Final runtime image
FROM scratch

COPY --from=compressor /server /server
COPY --from=builder-client /root/build /client

ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000

ENTRYPOINT ["/server"]





