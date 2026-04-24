import { addMessage, removeMessage } from "../store/StoreSlice";
import { useDispatch, useSelector } from 'react-redux';

function MessageBanner() {

    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages);

    let onClick = ((e) => {
        let idStr = e.target.id;
        let id = idStr.substring(idStr.indexOf('_') + 1);
        dispatch(removeMessage(id));
    });

    return (
        <div className="has-text-centered py-3" style={{
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            zIndex: '1000'
        }}>
            {messages.map((message) => (
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

export function showError(dispatch, msg) {
    const id = crypto.randomUUID();
    dispatch(addMessage({ id: id, msg: msg, kind: 'ERROR'}));

    setTimeout(() => {
        dispatch(removeMessage(id));
    }, 30000);
}

export function showInfo(dispatch, msg) {
    const id = crypto.randomUUID();
    dispatch(addMessage({ id: id, msg: msg, kind: 'INFO'}));

    setTimeout(() => {
        dispatch(removeMessage(id));
    }, 5000);
}

function msg_style(msg) {
    if (msg.kind === 'INFO') {
        return 'is-primary';
    }

    return 'is-danger';
}

export default MessageBanner;
