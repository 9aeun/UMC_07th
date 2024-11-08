import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as S from "../styles/signup.style";
import api from '../api/axios-auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.')
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange" // 입력 시마다 유효성 검사
    });

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/auth/login', {
                email: data.email,
                password: data.password,
            });

            console.log('로그인 성공:', response.data);
            
            // 응답 데이터에서 accessToken과 refreshToken을 localStorage에 저장
            const { accessToken, refreshToken } = response.data;
            if (accessToken && refreshToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                console.log('토큰 저장 성공');
            } else {
                console.error('로그인 응답에 토큰이 없습니다.');
            }
            
            navigate('/'); // 홈 페이지로 이동
        } catch (error) {
            console.error('로그인 실패:', error.response?.data || error.message);
            alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        <S.LoginContainer>
            <S.Intro>로그인</S.Intro>
            <form onSubmit={handleSubmit(onSubmit)}>
                <S.InputBox type="email" placeholder="이메일을 입력해주세요!" {...register("email")} />
                <p style={{ color: 'red' }}>{errors.email?.message}</p>

                <S.InputBox type="password" placeholder="비밀번호를 입력해주세요!" {...register("password")} />
                <p style={{ color: 'red' }}>{errors.password?.message}</p>

                <S.SubmitButton 
                    type="submit" 
                    disabled={!isValid}  // isValid를 통해 활성화 상태 관리
                >
                    로그인
                </S.SubmitButton>
            </form>
        </S.LoginContainer>
    );
};

export default LoginPage;
