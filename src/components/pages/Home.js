import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetchPots, savePot} from "../../actions/pots";
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Table,
    Form,
    Message
} from 'semantic-ui-react';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};


class HomePage extends Component {
    state = {
        fixed: false,
        showPotEditForm: false,
        potForEdit: {
            name: '',
            minHumidity: '',
            checkInterval: '',
            wateringDuration: '',
            humidity: '1'

        },
    };

    componentDidMount = () => this.onInit(this.props);

    onInit = props => props.fetchPots();

    showFixedMenu = () => this.setState({fixed: true});

    hideFixedMenu = () => this.setState({fixed: false});

    changePot = (item) => {
        this.setState({showPotEditForm: true, potForEdit: item})

    };

    onChange = e =>
        this.setState({
            potForEdit: { ...this.state.potForEdit, [e.target.name]: e.target.value }
        });

    savePot = () => {
        console.log(this.state.potForEdit);
        this.props.savePot(this.state.potForEdit);
    };

    render() {
        const {pots} = this.props;

        const items = pots.map((item) => (
            <Table.Row key={item.id} onClick={() => {
            }}>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.minHumidity}</Table.Cell>
                <Table.Cell>{item.checkInterval}</Table.Cell>
                <Table.Cell>{item.wateringDuration}</Table.Cell>
                <Table.Cell>
                    <Button icon='edit' onClick={() => this.changePot(item)}/>
                </Table.Cell>
            </Table.Row>
        ));


        const {fixed, showPotEditForm, potForEdit} = this.state;

        return (

            <Responsive
                fireOnMount
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{minHeight: 50, padding: '1em 1em', background: 'teal'}}
                        vertical>
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'>
                            <Container>
                                <Menu.Item as='h2'>
                                    Система полива патипуськи, она же свинуха-парасюха
                                </Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                <Grid centered columns={2}>
                    <Grid.Column>
                        <Header as='h2' color='red' textAlign='center'>
                            Горшки хрюшки
                        </Header>
                        <Table color='green' inverted basic style={{margin: '2em'}}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Код</Table.HeaderCell>
                                    <Table.HeaderCell>Имя</Table.HeaderCell>
                                    <Table.HeaderCell>Миимальная влажность</Table.HeaderCell>
                                    <Table.HeaderCell>Интервал проверки, мин</Table.HeaderCell>
                                    <Table.HeaderCell>Время работы помпы, с</Table.HeaderCell>
                                    <Table.HeaderCell>Редактирование</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {items}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    {showPotEditForm && <Grid.Row centered columns={4}>
                        <Grid.Column style={{maxWidth: 450}}>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input label='Имя горшка' value={potForEdit.name} name='name' onChange={(e)=>this.onChange(e) }/>
                                    <Form.Input label='Миимальная влажность' value={potForEdit.minHumidity} name='minHumidity' onChange={(e)=>this.onChange(e)}/>
                                    <Form.Input label='Интервал проверки, мин' value={potForEdit.checkInterval} name='checkInterval' onChange={(e)=>this.onChange(e)}/>
                                    <Form.Input label='Время работы помпы, с' value={potForEdit.wateringDuration} name='wateringDuration' onChange={(e)=> this.onChange(e)}/>

                                    <Message
                                        error
                                        header='Action Forbidden'
                                        content='You can only sign up for an account once with a given e-mail address.'
                                    />

                                    <Button color='teal' fluid size='large' onClick={() => this.savePot()}>
                                        Изменить
                                    </Button>
                                </Segment>

                            </Form>

                        </Grid.Column>
                    </Grid.Row>}
                </Grid>

            </Responsive>


        );
    }
}

HomePage.propTypes = {
    fetchPots: PropTypes.func.isRequired,
    savePot: PropTypes.func.isRequired,
    pots: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        pots: state.pots.allPots
    };
}

export default connect(mapStateToProps, {fetchPots, savePot})(HomePage);
