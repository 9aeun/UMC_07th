import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "../styles/signup.style";
import api from "../api/axios-auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 주소를 입력해주세요.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const loginMutation = useMutation(
    async (data: LoginForm) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        const { accessToken, refreshToken } = data;
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
        navigate("/");
        window.location.reload();
      },
      onError: (error: any) => {
        alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
      },
    }
  );

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <S.LoginContainer>
      <S.Intro>로그인</S.Intro>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.InputBox
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <S.InputBox
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>

        <S.SubmitButton
          type="submit"
          disabled={!isValid || loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "로그인 중..." : "로그인"}
        </S.SubmitButton>
      </form>
    </S.LoginContainer>
  );
};

export default LoginPage;
