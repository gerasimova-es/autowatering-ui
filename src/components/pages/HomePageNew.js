import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InlineError from '../messages/InlineError'
import DatePicker from '../custom/DatePicker'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
    Table,
    Button,
    Label,
    Icon,
    Modal,
    Input,
    Form,
    Message,
    Select
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchPots, savePot, fetchStatistic} from '../../actions/pots';

class HomePageNew extends Component {
    state = {
        potTableName: '',
        showModal: false,
        potForEdit: {
            code: '',
            name: '',
            minHumidity: '',
            checkInterval: '',
            wateringDuration: ''
        },
        loading: false,
        errors: {}
    };

    componentDidMount = () => this.onInit(this.props);

    onInit = props => props.fetchPots();


    changePot = (item) => {
        this.setState({
            showModal: true,
            potForEdit: item,
            potTableName: 'Редакирование',
            tableForAdd: false
        })
    };

    addNewPot = () => {
        this.setState({
            showModal: true,
            potTableName: 'Добавлениеx',
            tableForAdd: true,
            potForEdit: {
                code: '',
                name: '',
                minHumidity: '',
                checkInterval: '',
                wateringDuration: ''
            }
        })

    };

    exitFromEdit = () => {
        this.setState({
            showModal: false,
            errors: {}
        })

    };

    onChange = e =>
        this.setState({
            potForEdit: {...this.state.potForEdit, [e.target.name]: e.target.value}
        });

    savePot = () => {
        const errors = this.validate(this.state.potForEdit);
        console.log(errors);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .savePot(this.state.potForEdit)
                .catch(err => {
                        console.log(err);
                        this.setState({errors: err.response.data.errors, loading: false, showModal: false})
                    }
                );
        }
    };

    validate = pot => {
        const errors = {};
        if (!pot.code) errors.code = 'Не может быть пустым!';
        if (!pot.name) errors.name = 'Не может быть пустым!';
        if (this.emptyOrNotNumerical(pot.minHumidity) != null) errors.minHumidity = this.emptyOrNotNumerical(pot.minHumidity);
        if (this.emptyOrNotNumerical(pot.checkInterval) != null) errors.checkInterval = this.emptyOrNotNumerical(pot.checkInterval);
        if (this.emptyOrNotNumerical(pot.wateringDuration) != null) errors.wateringDuration = this.emptyOrNotNumerical(pot.wateringDuration);
        return errors;
    };

    emptyOrNotNumerical = (value) => {
        if (!value) {
            return 'Не может быть пустым!'
        }
        if (!/^\d+$/.test(value)) {
            return 'Числовое поле!'
        }
        return null
    };

    fetchStatistics = () => {

        this.props.fetchStatistic({
            code: 'AUTHORIUM',
            dateFrom: new Date(2017, 0, 1).toISOString().slice(0,10)+' 00:00:00',
            // dateTo: new Date().format('yyyy-MM-dd HH:mm:ss')
            dateTo: new Date().toISOString().slice(0,10)+' 00:00:00'
        });
    };

    render() {

        const {pots} = this.props;

        const table = pots.map((item) => (
            <Table.Row key={item.id}>
                <Table.Cell textAlign='center'>{item.name}</Table.Cell>
                <Table.Cell textAlign='center'>{item.minHumidity}</Table.Cell>
                <Table.Cell textAlign='center'>{item.checkInterval}</Table.Cell>
                <Table.Cell textAlign='center'>{item.wateringDuration}</Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button icon='edit' onClick={() => this.changePot(item)}/>
                </Table.Cell>
            </Table.Row>
        ));


        const {errors, loading, potForEdit, showModal, potTableName, tableForAdd} = this.state;

        return (
            <div>
                <Menu fixed='top' inverted style={{background: '#088A85'}}>
                    <Container>
                        <Menu.Item as='h3' header>
                            <Image size='mini' src={process.env.PUBLIC_URL + '/flower.png'}
                                   style={{marginRight: '1.5em'}}/>
                            Система полива
                        </Menu.Item>

                        <Dropdown item simple text='Меню'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Таблица горшков</Dropdown.Item>
                                <Dropdown.Item>Статистика</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Menu>

                <Container text style={{marginTop: '7em'}}>
                    <Header as='h1'>Таблица горшков:</Header>
                    <p>В таблице представлены данные о всех горшках в системе</p>
                </Container>
                <Container style={{marginTop: '1em', width: '80%'}}>
                    <Table celled style={{}}>
                        <Table.Header>
                            <Table.Row textAlign='center'>
                                <Table.HeaderCell>Имя</Table.HeaderCell>
                                <Table.HeaderCell>Миимальная влажность</Table.HeaderCell>
                                <Table.HeaderCell>Интервал проверки,<br/> мин</Table.HeaderCell>
                                <Table.HeaderCell>Время работы помпы,<br/> с</Table.HeaderCell>
                                <Table.HeaderCell>Редактирование</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {table}
                        </Table.Body>
                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                    <Button floated='right' icon labelPosition='left' size='small'
                                            onClick={() => this.addNewPot()}>
                                        <Icon name='add'/> Добавить горшок
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Container>
                <Container text style={{marginTop: '7em'}}>
                    <Header as='h1'>Статистика:</Header>
                    <p>В таблице представлены данные по влажности и времени</p>
                </Container>
                <Container style={{marginTop: '1em'}}>
                    <Button onClick={() => this.fetchStatistics()}>Получить статистику</Button>
                    <DatePicker/>
                </Container>


                <Modal open={showModal}>
                    <Header icon='table' content={potTableName}/>
                    <Modal.Content>
                        <Container>
                            <Form size='small' loading={loading}>
                                {errors.global && (
                                    <Message negative>
                                        <Message.Header>Ошибка сервера:</Message.Header>
                                        <p>{errors.global}</p>
                                    </Message>
                                )}
                                {tableForAdd &&
                                <Form.Input error={!!errors.code} label='Код горшка' value={potForEdit.code}
                                            name='code' onChange={(e) => this.onChange(e)}/>}
                                {errors.code && <InlineError text={errors.code}/>}
                                <Form.Input error={!!errors.name} label='Имя горшка' value={potForEdit.name}
                                            name='name' onChange={(e) => this.onChange(e)}/>
                                {errors.name && <InlineError text={errors.name}/>}
                                <Form.Input error={!!errors.minHumidity} label='Миимальная влажность'
                                            value={potForEdit.minHumidity}
                                            name='minHumidity' onChange={(e) => this.onChange(e)}/>
                                {errors.minHumidity && <InlineError text={errors.minHumidity}/>}
                                <Form.Input error={!!errors.checkInterval} label='Интервал проверки, мин'
                                            value={potForEdit.checkInterval}
                                            name='checkInterval' onChange={(e) => this.onChange(e)}/>
                                {errors.checkInterval && <InlineError text={errors.checkInterval}/>}
                                <Form.Input error={!!errors.wateringDuration} label='Время работы помпы, с'
                                            value={potForEdit.wateringDuration}
                                            name='wateringDuration' onChange={(e) => this.onChange(e)}/>
                                {errors.wateringDuration && <InlineError text={errors.wateringDuration}/>}

                            </Form>
                        </Container>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => this.exitFromEdit()}>
                            <Icon name='remove'/> Выйти
                        </Button>
                        <Button color='green' onClick={() => this.savePot()}>
                            <Icon name='checkmark'/> Сохранить
                        </Button>
                    </Modal.Actions>
                </Modal>


                <Segment inverted vertical style={{margin: '5em 0em 0em', padding: '5em 0em', background: '#04B4AE'}}>
                    <Container textAlign='center'>
                        <Grid divided inverted stackable>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Group 1'/>
                                <List link inverted>
                                    <List.Item as='a'>Link One</List.Item>
                                    <List.Item as='a'>Link Two</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Group 2'/>
                                <List link inverted>
                                    <List.Item as='a'>Link One</List.Item>
                                    <List.Item as='a'>Link Two</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Group 3'/>
                                <List link inverted>
                                    <List.Item as='a'>Link One</List.Item>
                                    <List.Item as='a'>Link Two</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header inverted as='h4' content='Footer Header'/>
                                <p>
                                    Extra space for a call to action inside the footer that could help re-engage users.
                                </p>
                            </Grid.Column>
                        </Grid>

                        <Divider inverted section/>
                        <Image centered size='mini' src={process.env.PUBLIC_URL + '/flower.png'}/>
                        <List horizontal inverted divided link size='small'>
                            <List.Item as='a' href='#'>
                                Site Map
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Contact Us
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Terms and Conditions
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Privacy Policy
                            </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div>
        );
    }
}

HomePageNew.propTypes = {
    fetchPots: PropTypes.func.isRequired,
    fetchStatistic: PropTypes.func.isRequired,
    savePot: PropTypes.func.isRequired,
    pots: PropTypes.array.isRequired,
    statistics: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        pots: state.pots.allPots,
        statistics: state.pots.statistics
    };
}

export default connect(mapStateToProps, {fetchPots, savePot, fetchStatistic})(HomePageNew);