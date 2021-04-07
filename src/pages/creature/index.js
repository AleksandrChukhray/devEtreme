import React from 'react';
import { useParams } from 'react-router-dom';
import Form, {
    SimpleItem,
    GroupItem,
    Label
} from 'devextreme-react/form';
import { LoadPanel } from 'devextreme-react/load-panel';

import useFetch from "../../utils/async-hook";
import './creature.scss';

export const Creature = (props) => {
    const { id } = useParams();
    const [data, loading] = useFetch({url: `http://swapi.dev/api/people/${id}`})

    return (
        <React.Fragment>
            <h2 className={'content-block'}>Creature</h2>
            <div className="content-block dx-card responsive-paddings">
                {loading ? <LoadPanel
                    closeOnOutsideClick={true}
                    visible={loading}
                    onHidden={() => {}}
                /> :
                    <Form formData={data}>
                        <GroupItem cssClass="second-group" colCount={2}>
                            <GroupItem>
                                <SimpleItem dataField="name">
                                    <Label text="Name" />
                                </SimpleItem>
                                <SimpleItem dataField="height">
                                    <Label text="Height" />
                                </SimpleItem>
                                <SimpleItem dataField="mass">
                                    <Label text="Mass" />
                                </SimpleItem>
                                <SimpleItem dataField="hair_color">
                                    <Label text="Hair color" />
                                </SimpleItem>
                                <SimpleItem dataField="skin_color">
                                    <Label text="Skin color" />
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem>
                                <SimpleItem dataField="eye_color">
                                    <Label text="Eye color" />
                                </SimpleItem>
                                <SimpleItem dataField="birth_year">
                                    <Label text="Birth year" />
                                </SimpleItem>
                                <SimpleItem dataField="gender">
                                    <Label text="Gender" />
                                </SimpleItem>
                                <SimpleItem dataField="homeworld">
                                    <Label text="Home world" />
                                </SimpleItem>
                            </GroupItem>
                        </GroupItem>
                    </Form>
                }
            </div>
        </React.Fragment>
    );
}

export default Creature;