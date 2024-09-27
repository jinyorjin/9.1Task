import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utilis/firebase";
import {
  GridColumn,
  FormInput,
  Button,
  Form,
  Grid,
  Segment,
  Divider,
  Message,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // UserContext 가져오기

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // 전역 상태에서 사용자 정보를 설정할 수 있는 함수

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 로그인 상태 유지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Firebase에서 프리미엄 여부 확인
        user.getIdTokenResult().then((tokenResult) => {
          const isPremium = tokenResult.claims.premium || false;
          // 전역 상태에 사용자 정보 저장
          setUser({
            email: user.email,
            uid: user.uid,
            premium: isPremium,
          });

          // 프리미엄이면 프리미엄 페이지로 이동, 아니면 일반 홈으로 이동
          if (isPremium) {
            navigate("/premium");
          } else {
            navigate("/");
          }
        });
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [navigate, setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    setError(""); // 에러 초기화

    try {
      // Firebase Authentication을 사용하여 로그인 시도
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firebase에서 프리미엄 여부 확인
      const tokenResult = await user.getIdTokenResult();
      const isPremium = tokenResult.claims.premium || false;

      // 전역 상태에 사용자 정보 저장
      setUser({
        email: user.email,
        uid: user.uid,
        premium: isPremium,
      });

      // 프리미엄 여부에 따라 페이지 이동
      if (isPremium) {
        navigate("/premium");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <Segment placeholder>
      <Grid columns={2} centered relaxed="very" stackable>
        <GridColumn>
          <Form onSubmit={handleLogin} loading={loading}>
            {/* 로딩 중일 때 form을 비활성화 */}
            <FormInput
              icon="user"
              iconPosition="center"
              label="Your email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInput
              icon="lock"
              iconPosition="center"
              label="Your Password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              content="Login"
              primary
              fluid
              loading={loading}
              disabled={loading}
            />
          </Form>

          {/* 에러 메시지가 있을 경우 화면에 표시 */}
          {error && (
            <Message negative>
              <Message.Header>Login Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}

          <Divider />
          <Button as={Link} to="/signup" content="Sign up" basic fluid />
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default Login;
