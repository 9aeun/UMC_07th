import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "../styles/signup.style";
import api from "../api/axios-auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const SignUpPage = () => {
  const navigate = useNavigate();

  // 유효성 검사 스키마 정의
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 입력해주세요."),
  });

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // 입력 시 유효성 검사를 수행
  });

  // 회원가입 요청 useMutation
  const signUpMutation = useMutation(
    async (data) => {
      const response = await api.post("/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.confirmPassword,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        console.log("회원가입 성공");
        alert("회원가입에 성공했습니다!");
        navigate("/login"); // 회원가입 후 로그인 페이지로 이동
      },
      onError: (error) => {
        console.error("회원가입 실패:", error.response?.data || error.message);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      },
    }
  );

  // 폼 제출 핸들러
  const onSubmit = (data) => {
    signUpMutation.mutate(data); // useMutation을 통해 요청 실행
  };

  return (
    <S.LoginContainer>
      <S.Intro>회원가입</S.Intro>
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

        <S.InputBox
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          {...register("confirmPassword")}
        />
        <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>

        <S.SubmitButton
          type="submit"
          disabled={!isValid || signUpMutation.isLoading} // 로딩 중 또는 유효하지 않으면 비활성화
        >
          {signUpMutation.isLoading ? "제출 중..." : "제출"}
        </S.SubmitButton>
      </form>
    </S.LoginContainer>
  );
};

export default SignUpPage;
