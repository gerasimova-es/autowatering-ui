import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {fetchPots} from "../../actions/pots";
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
    Table
} from 'semantic-ui-react';

class HomePage extends Component {
    componentDidMount = () => this.onInit(this.props);

    onInit = props => props.fetchPots();


    render() {
        const {pots} = this.props;

        const items = pots.map((item) => (
            <Table.Row key={item.id} onClick={() => {console.log('Катька писька')}}>
                <Table.Cell>{item.code}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>пук</Table.Cell>
            </Table.Row>
        ));

        return (
            <Responsive>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Код</Table.HeaderCell>
                            <Table.HeaderCell>Имя</Table.HeaderCell>
                            <Table.HeaderCell>Влажность</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {items}
                    </Table.Body>
                </Table>
            </Responsive>

        );
    }
}

HomePage.propTypes = {
    fetchPots: PropTypes.func.isRequired,
    pots: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        pots: state.pots.allPots
    };
}

export default connect(mapStateToProps, {fetchPots})(HomePage);
