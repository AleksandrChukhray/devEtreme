import React from 'react';
import './planet.scss';
import useFetch from "../../utils/async-hook";
import {useParams} from 'react-router-dom';
import Form, {
    SimpleItem,
    GroupItem,
    Label
} from 'devextreme-react/form';
import 'devextreme-react/text-area';
import {LoadPanel} from "devextreme-react/load-panel";

export const Planet = (props) => {
    const {id} = useParams();
    const [data, loading] = useFetch({url: `https://swapi.dev/api/planets/${id}`})

    return (
        <React.Fragment>
            <h2 className={'content-block'}>Planet</h2>
            <div className="content-block dx-card responsive-paddings">
                {
                    loading ? <LoadPanel
                        closeOnOutsideClick={true}
                        visible={loading}
                        onHidden={() => {
                        }}
                    /> : <Form formData={data}>
                        <GroupItem cssClass="second-group" colCount={2}>
                            <GroupItem>
                                <SimpleItem dataField="name">
                                    <Label text="Name"/>
                                </SimpleItem>
                                <SimpleItem dataField="rotation_period">
                                    <Label text="Rotation period"/>
                                </SimpleItem>
                                <SimpleItem dataField="orbital_period">
                                    <Label text="Orbital period"/>
                                </SimpleItem>
                                <SimpleItem dataField="diameter">
                                    <Label text="Diameter"/>
                                </SimpleItem>
                                <SimpleItem dataField="climate">
                                    <Label text="Climate"/>
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem>
                                <SimpleItem dataField="gravity">
                                    <Label text="Gravity"/>
                                </SimpleItem>
                                <SimpleItem dataField="terrain">
                                    <Label text="Terrain"/>
                                </SimpleItem>
                                <SimpleItem dataField="surface_water">
                                    <Label text="Surface water"/>
                                </SimpleItem>
                                <SimpleItem dataField="population">
                                    <Label text="Population"/>
                                </SimpleItem>
                            </GroupItem>
                        </GroupItem>
                    </Form>
                }
            </div>
        </React.Fragment>
    );
}

export default Planet;