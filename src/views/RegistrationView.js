import React from 'react';
import apiService from '../apiServices';

export default class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            password: '',
            result: null,
            error: null
        };
    }

    handleSubmit(e) {
        this.setState({
            result: null,
            error: null
        });
        apiService.user
            .create({
                nickname: this.state.nickname,
                password: this.state.password
            })
            .then(() => {
                this.setState({ result: 'Пользователь успешно зарегистрирован' });
                setTimeout(() => this.props.history.push('/login'), 2000);
            })
            .catch(error => this.setState({ error: 'Ошибка' + error.response.data.error }));
        e.preventDefault();
    }

    render() {
        return (
            <>
                <h1>Регистрация</h1>
                {this.state.error}
                {this.state.result}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label>
                            Никнейм:&nbsp;
                            <input
                                type="text"
                                value={this.state.nickname}
                                onChange={e => this.setState({ nickname: e.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Пароль:&nbsp;
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit">Создать пользователя</button>
                </form>
            </>
        );
    }
}
