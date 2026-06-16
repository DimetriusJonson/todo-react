import Button from "../components/Button";
import TasksPanel from "../composite/TasksPanel";
import SelectInput from "../components/SelectInput";
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSortKind } from "../store/StoreSlice";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

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
        <div className="container is-size-7-mobile pt-5">
            <div className="buttons is-justify-content-space-between px-2 pb-5">
                <span>
                    <SelectInput className="is-size-7-mobile" name="filterSelect" notSelectedText="Фильтр" value={filter} options={filterOptions} onChange={filterOnChange} />
                    <SelectInput className="is-size-7-mobile pl-2" name="sortSelect" notSelectedText="Сортировка" value={sortKind} options={sortOptions} onChange={sortOnChange} />
                </span>
                <Button className="level-item is-light is-size-7-mobile" id="create_button" label="Создать" onClick={() => navigate('/task/create')} />
            </div>

            <TasksPanel />
        </div>
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
