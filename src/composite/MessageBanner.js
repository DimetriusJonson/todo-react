
function MessageBanner({ messages, setMessages }) {
    let onClick = ((e) => {
        let idStr = e.target.id;
        let id = parseInt(idStr.substring(idStr.indexOf('_') + 1));
        setMessages(messages.filter(m => m.id !== id));
    });

    return (
        <div className="has-text-centered py-3" style={{
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            zIndex: '1000'
        }}>
            {messages.map((message, index) => (
                <p key={message.id} className="field">
                    <span className={'tag is-medium ' + msg_style(message)}>
                        {message.msg}
                        <button className="delete is-small" id={'m_' + message.id} onClick={onClick}></button>
                    </span>
                </p>
            ))}
        </div>

    );
}

export function showError(messages, setMessages, msg) {
    let maxId = Math.max(...messages.map(item => item.id));
    let id = isFinite(maxId) ? maxId + 1 : 0;

    messages.push({ id: id, msg: msg, kind: 'ERROR'});

    setTimeout(() => {
        setMessages(messages.filter(m => m.id !== id));
    }, 30000);
}

export function showInfo(messages, setMessages, msg) {
    let maxId = Math.max(...messages.map(item => item.id));
    let id = isNaN(maxId) ? maxId + 1 : 0;

    messages.push({ id: id, msg: msg, kind: 'INFO'});

    setTimeout(() => {
        setMessages(messages.filter(m => m.id !== id));
    }, 5000);
}

function msg_style(msg) {
    if (msg.kind === 'INFO') {
        return 'is-primary';
    }

    return 'is-danger';
}

export default MessageBanner;
