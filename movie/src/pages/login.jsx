import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as S from "../styles/signup.style";

const LoginPage = () => {
    const schema = yup.object().shape({
        email: yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 입력해주세요.')
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange" // 입력 시마다 유효성 검사
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출');
        console.log(data);
    };

    return (
        <S.LoginContainer>
            <S.Intro>로그인</S.Intro>
            <form onSubmit={handleSubmit(onSubmit)}>
                <S.InputBox type="email" placeholder="이메일을 입력해주세요!" {...register("email")} />
                <p style={{ color: 'red' }}>{errors.email?.message}</p>

                <S.InputBox type="password" placeholder="비밀번호를 입력해주세요!" {...register("password")} />
                <p style={{ color: 'red' }}>{errors.password?.message}</p>

                <S.SubmitButton type="submit" disabled={!isValid} isDisabled={!isValid}>
                    로그인
                </S.SubmitButton>
            </form>
        </S.LoginContainer>
    );
};

export default LoginPage;
