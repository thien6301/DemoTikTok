import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import { register } from '~/services/authService';
import styles from './RegisterForm.module.scss';
import Button from '~/components/Button';
// import { NotifyContextKey } from '~/contexts/NotifyContext';
import {
    IconEyeHide,
    IconEyeShow,
    IconTextWarning,
    IconTickBox,
} from '~/components/Icons';
import { NotifyContextKey } from '~/components/Contexts/NotifyContext';
import { LoginContext } from '~/components/Contexts/LoginModalContext';

const cx = classNames.bind(styles);

const passwordRules = [
    {
        name: '8 đến 20 ký tự',
        // null: default, true: ok, false: no ok
        state: null,
        check: (password) => {
            return password.length >= 8 && password.length <= 20;
        },
    },
    {
        name: 'Các chữ cái, số và ký tự đặc biệt',
        state: null,
        check: (password) => {
            const regex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^+-])[A-Za-z\d@$!%*#?&^+-]*$/;
            return regex.test(password);
        },
    },
];

function RegisterWithEmail() {
    const contextLogin = useContext(LoginContext);

    // Input state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logined, setLogined] = useState(false);

    // Error state
    const [isPassError, setIsPassError] = useState(false);
    const [passErrorMessage, setPassErrorMessage] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    // Rule state
    const [ruleError, setRuleError] = useState(false);
    const [passRules, setPassRules] = useState(passwordRules);
    const [passRulesShow, setPassRulesShow] = useState(false);

    // Context
    const showNotify = useContext(NotifyContextKey);

    // Redux

    useEffect(() => {
        const newPassRules = [...passRules];
        let isChanged = false;

        newPassRules.forEach((rule) => {
            const checkResult = rule.check(password) || null;
            if (checkResult !== rule.state) {
                rule.state = checkResult;
                isChanged = true;
            }

            setIsPassError(!checkResult);
        });

        isChanged && setPassRules(newPassRules);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const handleToggleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleChangePassword = (e) => {
        const value = e.target.value;
        const invalidValue = value.includes(' ');
        invalidValue || setPassword(e.target.value);

        const invalidCharacter =
            value.includes('"') || value.includes("'") || value.includes('`');
        if (invalidCharacter) {
            setPassErrorMessage('Ký tự đặc biệt không hợp lệ');
        } else {
            passErrorMessage && setPassErrorMessage('');
        }
    };

    const handleBlurPassword = () => {
        if (password) {
            const newPassRules = [...passRules];
            let isChanged = false;

            newPassRules.forEach((rule) => {
                // state === null => state = false
                if (!rule.state) {
                    rule.state = false;
                    isChanged = true;
                }
            });

            if (isChanged) {
                setRuleError(true);
                setPassRules(newPassRules);
            } else {
                setPassRulesShow(false);
            }
        } else {
            setPassRulesShow(false);
        }
    };

    const handleFocusPassword = () => {
        const newPassRules = [...passRules];
        let isChanged = false;

        newPassRules.forEach((rule) => {
            if (rule.state === false) {
                rule.state = null;
                isChanged = true;
            }
        });

        isChanged && setPassRules(newPassRules);
        ruleError && setRuleError(false);
        !passRulesShow && setPassRulesShow(true);
    };

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            !isEmailError && setIsEmailError(true);
        } else {
            isEmailError && setIsEmailError(false);
        }
    };

    const handleBlurEmail = () => {
        if (isEmailError) {
            setEmailErrorMessage('Nhập địa chỉ email hợp lệ');
        }
    };

    const handleFocusEmail = () => {
        emailErrorMessage && setEmailErrorMessage('');
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataRegister = {
            type: 'email',
            email: email,
            password: password,
        };

        setLoading(true);
        const action = await register(dataRegister);
        setLoading(false);

        if (!action) {
            setEmailErrorMessage('Email này hiện không khả dụng!');
        } else {
            contextLogin.fetchApi(email, password);
            showNotify('Login Success')
            // reload to reset videos data
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const disableSubmitBtn = !email || !password || isEmailError || isPassError;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Register</div>
            {/* Header */}
            <div className={cx('content')}>
                <div className={cx('title-input')}>
                    <span className={cx('title-email')}>Email</span>
                </div>

                {/* Email */}
                <div className={cx('form')}>
                    <div
                        className={cx('input-data', {
                            warning: emailErrorMessage,
                        })}
                    >
                        <input
                            type="text"
                            value={email}
                            placeholder="Địa chỉ email"
                            onChange={handleChangeEmail}
                            onFocus={handleFocusEmail}
                            onBlur={handleBlurEmail}
                        />

                        {!!emailErrorMessage && (
                            <span className={cx('warning-icon')}>
                                <IconTextWarning />
                            </span>
                        )}
                    </div>

                    <p className={cx('message')}>{emailErrorMessage}</p>

                    {/* Password */}
                    <div className={cx('input-data', { warning: !!ruleError })}>
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            placeholder="Mật khẩu"
                            onChange={handleChangePassword}
                            onBlur={handleBlurPassword}
                            onFocus={handleFocusPassword}
                        />
                        {!!ruleError && (
                            <span className={cx('warning-icon')}>
                                <IconTextWarning />
                            </span>
                        )}
                        <span
                            className={cx('show-password')}
                            onClick={handleToggleShowPass}
                        >
                            {showPass ? <IconEyeShow /> : <IconEyeHide />}
                        </span>
                    </div>

                    <p className={cx('message')}>{passErrorMessage}</p>

                    {/* Show password rules */}
                    {passRulesShow && (
                        <div className={cx('password-rules')}>
                            <p className={cx('title')}>
                                Mật khẩu của bạn phải gồm:
                            </p>
                            {passRules.map((rule, index) => {
                                return (
                                    <p
                                        key={index}
                                        className={cx('rule', {
                                            ok: rule.state === true,
                                        })}
                                    >
                                        <span className={cx('rule-icon')}>
                                            <IconTickBox />
                                        </span>
                                        <span
                                            className={cx('rule-text', {
                                                ng: rule.state === false,
                                            })}
                                        >
                                            {rule.name}
                                        </span>
                                    </p>
                                );
                            })}
                        </div>
                    )}

                    <div className={cx('email-consent')}>
                        <div>
                            <input id="box" type="checkbox" hidden />
                            <label htmlFor="box">
                                <IconTickBox />
                            </label>
                        </div>
                        <p>
                            Nhận nội dung thịnh hành, bản tin, khuyến mại, đề
                            xuất và thông tin cập nhật tài khoản được gửi đến
                            email của bạn
                        </p>
                    </div>

                    {/* Submit */}
                    <Button
                        className={cx('button-login', {
                            disable: disableSubmitBtn,
                        })}
                        primary
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Đăng ký
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterWithEmail;
