import React, { Component } from 'react';
import { updateMaps, deleteMaps, resendMaps } from '../../actions/maps';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class MapItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            lat: this.props.lat,
            lang: this.props.lang,
            isEdit: false,
        }
        this.editBtnClicked = this.editBtnClicked.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleResend = this.handleResend.bind(this)
    }

    editBtnClicked() {
        this.setState({
            title: this.props.title,
            lat: this.props.lat,
            lang: this.props.lang,
            isEdit: true
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdate() {
        this.props.updateMaps(this.props._id, this.props.id, this.state.title, this.state.lat, this.state.lang)
        this.setState({
            isEdit: false
        })
    }

    handleResend() {
        this.props.resendMaps(this.props._id, this.state.title, this.state.lat, this.state.lang)
    }

    handleDelete() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You're data can't restore again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I\'m sure!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteMaps(this.props.id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }

    render() {
        if (this.state.isEdit) {
            return (
                <tr>
                    <th scope="row">{this.props.no}</th>
                    <td>
                        <input type="text" value={this.state.title} onChange={this.handleInputChange} name="title" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={this.state.lat} onChange={this.handleInputChange} name="lat" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={this.state.lang} onChange={this.handleInputChange} name="lang" className="form-control" />
                    </td>

                    <td>
                        <button onClick={this.handleUpdate} className={"btn btn-success mr-2 "}><i className="fa fa-save"></i> Save</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr className={this.props.sent ? "" : "bg-danger text-white"}>
                    <th scope="row">{this.props.no}</th>
                    <td>{this.props.title}</td>
                    <td >{this.props.lat}</td>
                    <td>{this.props.lang}</td>


                    <td>
                        <button onClick={this.editBtnClicked} className={this.props.sent ? "btn btn-success mr-2" : "d-none"}><i className="fa fa-edit"></i> Update </button>
                        <button onClick={this.props.sent ? this.handleDelete : this.handleResend} className={this.props.sent ? 'btn btn-danger' : 'btn btn-warning'}><i className={this.props.sent ? "fa fa-trash" : "fa fa-refresh"}></i> {this.props.sent ? 'delete' : 'Resend'}</button>
                    </td>
                </tr>
            )
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateMaps: (_id, id, title, lat, lang) => dispatch(updateMaps(_id, id, title, lat, lang)),
    deleteMaps: () => dispatch(deleteMaps(ownProps.id)),
    resendMaps: (_id, id, title, lat, lang) => dispatch(resendMaps(_id, id, title, lat, lang)),
})

export default connect(
    null,
    mapDispatchToProps
)(MapItem)