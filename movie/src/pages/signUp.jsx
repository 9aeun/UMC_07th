import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as S from "../styles/signup.style";
import api from '../api/axios-auth';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호 확인을 입력해주세요.')
    });

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange" // 입력 시마다 유효성 검사를 수행
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/auth/register', {
                email: data.email,
                password: data.password,
                passwordCheck: data.confirmPassword,
            });
            console.log('회원가입 성공:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패:', error.response?.data || error.message);
        }
    };

    return (
        <S.LoginContainer>
            <S.Intro>회원가입</S.Intro>
            <form onSubmit={handleSubmit(onSubmit)}>
                <S.InputBox type="email" placeholder="이메일을 입력해주세요!" {...register("email")} />
                <p style={{ color: 'red' }}>{errors.email?.message}</p>

                <S.InputBox type="password" placeholder="비밀번호를 입력해주세요!" {...register("password")} />
                <p style={{ color: 'red' }}>{errors.password?.message}</p>

                <S.InputBox type="password" placeholder="비밀번호를 다시 입력해주세요!" {...register("confirmPassword")} />
                <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>
                <S.SubmitButton 
                    type="submit" 
                    disabled={!isValid || password !== confirmPassword} 
                >
                    제출
                </S.SubmitButton>
            </form>
        </S.LoginContainer>
    );
};

export default SignUpPage;
