import Button from "../components/Button";
import TasksPanel from "../composite/TasksPanel";
import MessageBanner from "../composite/MessageBanner";
import { useState } from 'react';

function Home() {
    const [messages, setMessages] = useState([]);

    return (

        <section className="section is-paddingless">
            <div className="container">
                <nav className="level">
                    <div className="level-left">
                    </div>
                    <div className="level-right">
                        <Button className="level-item is-light" id="create_button" label="Создать" />
                    </div>
                </nav>

                <TasksPanel />
            </div>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>


    );
}

export default Home;
