import React, { useRef } from 'react';
import './planets.scss';
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

        return fetch(`https://swapi.dev/api/planets/${page === 0 ? '' : ('?page=' + (page + 1))}`)
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

export const Planets = () => {
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

        index && router.push(`/planets/${index}/`);
    }

    return (
        <React.Fragment>
            <h2 className={'content-block'}>Planets</h2>
            <div ref={getTableRef} className="content-block dx-card responsive-paddings">
                <DataGrid
                    dataSource={customDataSource}
                    showBorders={true}
                    remoteOperations={true}
                >
                    <Column
                        dataField="name"
                        dataType="string"
                        onClick={() => console.log('name')}
                    />
                    <Column
                        dataField="rotation_period"
                        dataType="string"
                    />
                    <Column
                        dataField="orbital_period"
                        dataType="string"
                    />
                    <Column
                        dataField="diameter"
                        dataType="string"
                    />
                    <Column
                        dataField="climate"
                        dataType="string"
                    />
                    <Column
                        dataField="gravity"
                        dataType="string"
                    />
                    <Column
                        dataField="terrain"
                        dataType="string"
                    />
                    <Column
                        dataField="surface_water"
                        dataType="string"
                    />
                    <Column
                        dataField="population"
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

export default Planets;
