/*import React from 'react';
import forms from 'newforms';
import Component from '../../components/component.react';
import {msg} from '../../messages/store';
import {TextField, RaisedButton, Toolbar, ToolbarTitle} from 'material-ui';

class UserForm extends Component {
    static propTypes = {
        data: React.PropTypes.object,
        formTitle: React.PropTypes.string.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    };

    constructor(props) {
        const NewForm = forms.Form.extend({
            email: forms.EmailField({
                required: true,
                errorMessages: {
                    required: msg('users.error.email_required'),
                    invalid: msg('users.error.email_invalid')
                }
            }),
            id: forms.CharField({
                widget: forms.HiddenInput,
                required: false
            })
        });

        super(props);
        this.state = {
            form: new NewForm({
              controlled: true,
              onChange: ::this.forceUpdate
            })
        };
    }

    componentWillReceiveProps(user) {
        this.state.form.reset();

        if (user.data !== null)
            this.state.form.setData(user.data);
    }

    onSubmit(e) {
        e.preventDefault();

        const form = this.state.form;
        const isValid = form.validate();

        if (isValid) {
            this.props.onSubmit(form.cleanedData);
            this.state.form.reset();
        } else {
            console.log('erreur');
        }
    }

    render() {
        const form = this.state.form;

        return (
            <div>
                <Toolbar>
                    <ToolbarTitle text={this.props.formTitle} />
                </Toolbar>
                <form name='user-form' ref='user-form' onSubmit={::this.onSubmit} className="user-form" noValidate>
                    {form.nonFieldErrors().render()}
                    <div>
                        <TextField
                            floatingLabelText={form.boundField('email').label}
                            errorText={form.boundField('email').errors().render()}
                            >
                            {form.boundField('email').render()}
                        </TextField>
                        <div className="hidden-fields">
                            {form.boundField('id').render()}
                        </div>
                    </div>

                    <div className="action-container">
                        <RaisedButton primary={true} label={msg('send')} type="submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default UserForm;
*/
