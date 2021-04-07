import React, { useRef } from 'react';
import './creatures.scss';
import DataGrid, {Column, Paging, Pager} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { useHistory } from 'react-router-dom';
import * as events from 'devextreme/events';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const customDataSource = new CustomStore({
    key: 'name',
    load: function (loadOptions) {
        const RESULT_LENGTH = 10;
        const {take, skip} = loadOptions;
        const page = Math.floor(skip / RESULT_LENGTH);

        return fetch(`https://swapi.dev/api/people/${page === 0 ? '' : ('?page=' + (page + 1))}`)
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                const {results, count} = data;
                let sliceResult = results;

                if (take < results.length) {
                    if ((skip / results.length) % 1 !== 0) {
                        sliceResult = results.slice(take);
                    } else {
                        sliceResult = results.slice(0, take);
                    }
                }

                return {
                    data: sliceResult,
                    totalCount: count,
                    summary: undefined,
                    groupCount: undefined
                };
            })
            .catch(() => {
                throw Error('Network error');
            });
    }
});

export const Creatures = () => {
    const router = useHistory();
    const tableRef = useRef();

    const getTableRef =(element) => {
        if(!element) return element;

        const prevElement = tableRef.current;
        if (prevElement) {
            events.off(prevElement, 'dxdblclick');
        }

        tableRef.current = element;
        events.on(element, 'dxdblclick', e => {
            onDoubleClickHandler(e);
        });
    };

    const onDoubleClickHandler = (e) => {
        const { target: { parentElement: { attributes: attr } }} = e;
        const index = attr?.['aria-rowindex']?.value;

        index && router.push(`/creatures/${index}/`);
    }

    return (
        <React.Fragment>
            <h2 className={'content-block'}>Creatures</h2>
            <div ref={getTableRef} className="content-block dx-card responsive-paddings">
                <DataGrid
                    dataSource={customDataSource}
                    showBorders={true}
                    remoteOperations={true}
                >
                    <Column
                        dataField="name"
                        dataType="string"
                    />
                    <Column
                        dataField="height"
                        dataType="string"
                    />
                    <Column
                        dataField="mass"
                        dataType="string"
                    />
                    <Column
                        dataField="hair_color"
                        dataType="string"
                    />
                    <Column
                        dataField="skin_color"
                        dataType="string"
                    />
                    <Column
                        dataField="eye_color"
                        dataType="string"
                    />
                    <Column
                        dataField="birth_year"
                        dataType="string"
                    />
                    <Column
                        dataField="gender"
                        dataType="string"
                    />
                    <Column
                        dataField="homeworld"
                        dataType="string"
                    />
                    <Paging defaultPageSize={10}/>
                    <Pager
                        showPageSizeSelector={true}
                        allowedPageSizes={[5, 10]}
                    />
                </DataGrid>
            </div>
        </React.Fragment>
    );
}

export default Creatures;