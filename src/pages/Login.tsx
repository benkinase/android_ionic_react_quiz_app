import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonInput,
} from "@ionic/react";
import "./Login.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// local imports
import {
  loginUser,
  signInWithGoogle,
  signInWithGithub,
} from "../redux/firebaseRequests";
import { setUserState } from "../redux/Actions";
import { toast } from "../toast";
import { ColoredLetter, styleIconiQ } from "../utils/coloredLetters";

const Login: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  // collection data
  const login = async () => {
    setLoading(true);
    if (!password || !email) {
      setLoading(false);
      return;
    }
    const res: any = await loginUser(email, password);
    if (res) {
      dispatch(setUserState(res.user));
      history.replace("/home");
      toast("You have logged in", "success");
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const res: any = await signInWithGoogle();
    if (res) {
      dispatch(setUserState(res.user));
      history.replace("/home");
      toast("You have logged in", "success");
    }
  };
  const handleGithubSignIn = async () => {
    const res: any = await signInWithGithub();
    if (res) {
      dispatch(setUserState(res.user));
      history.replace("/home");
      toast("You have logged in", "success");
    }
  };
  //randomly colored letters
  ColoredLetter("#iconiq-l");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={styleIconiQ.fonty}>
            <div id='iconiq-l'>iconiQ</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='page-login'>
          <IonLoading message='logging...' duration={0} isOpen={loading} />

          <div className='login'>
            <div className='login-content'>
              <div className='buttons social'>
                <IonButton
                  className='login-btn google'
                  color='secondary'
                  size='large'
                  onClick={() => handleGoogleSignIn()}
                >
                  Google-login
                </IonButton>
                <IonButton
                  className='login-btn github'
                  color='secondary'
                  size='large'
                  onClick={() => handleGithubSignIn()}
                >
                  Github-login
                </IonButton>
              </div>
              <p className='or'>oder</p>
              <div className='form'>
                <div className='input-control'>
                  <IonInput
                    type='text'
                    value={email}
                    className='input'
                    placeholder='Enter Email'
                    onIonChange={(e: any) => setEmail(e.detail.value)}
                  ></IonInput>
                </div>
                <div className='input-control'>
                  <IonInput
                    type='password'
                    value={password}
                    className='input'
                    placeholder='Enter Password'
                    onIonChange={(e: any) => setPassword(e.detail.value)}
                  ></IonInput>
                </div>

                <div className='buttons'>
                  <IonButton
                    className='login-btn'
                    color='secondary'
                    size='large'
                    onClick={login}
                  >
                    Login
                  </IonButton>
                  <Link to={!user ? "/home" : ""} id='no-auth'>
                    Quiz without account
                  </Link>
                </div>
              </div>
              <div className='redirect'>
                <span>No Account?</span>
                <Link to={"/register"} className='link-'>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Login;
