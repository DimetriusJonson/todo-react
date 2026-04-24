import Button from "../components/Button";
import TasksPanel from "../composite/TasksPanel";
import MessageBanner from "../composite/MessageBanner";
import { useState } from 'react';
import SelectInput from "../components/SelectInput";
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSortKind } from "../store/StoreSlice";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.settings.filter);
    const sortKind = useSelector((state) => state.settings.sortKind);

    let filterOnChange = (value) => {
        dispatch(setFilter(value));
    };

    let sortOnChange = (value) => {
        dispatch(setSortKind(value));
    };

    let filterOptions = [
        filterToOption('Completed'),
        filterToOption('Uncompleted')
    ];

    let sortOptions = [
        sortToOption('Title'),
        sortToOption('Priority')
    ];

    return (

        <section className="section is-paddingless">
            <div className="container">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <SelectInput name="filterSelect" notSelectedText="Фильтр" value={filter} options={filterOptions} onChange={filterOnChange} />
                            <SelectInput className="ml-3" name="sortSelect" notSelectedText="Сортировка" value={sortKind} options={sortOptions} onChange={sortOnChange} />
                        </div>
                    </div>
                    <div className="level-right">
                        <Button className="level-item is-light" id="create_button" label="Создать" onClick={() => navigate('/task/create')}/>
                    </div>
                </nav>

                <TasksPanel />
            </div>
            <MessageBanner messages={messages} setMessages={setMessages} />
        </section>


    );
}

function filterToOption(filter) {
    switch (filter) {
        case 'Completed': return { value: filter, text: 'Завершенные' };
        case 'Uncompleted': return { value: filter, text: 'Незавершенные' };
        default: return { value: null, text: 'Не выбран' };
    }
}

function sortToOption(sortKind) {
    switch (sortKind) {
        case 'Title': return { value: sortKind, text: 'Название' };
        case 'Priority': return { value: sortKind, text: 'Приоритет' };
        default: return { value: null, text: 'Не выбран' };
    }
}

export default Home;
