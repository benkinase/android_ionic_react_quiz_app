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
import { loginUser } from "../redux/firebaseRequests";
import { setUserState } from "../redux/Actions";
import { toast } from "../toast";
import { generateColoredLetter, styleIconiQ } from "../utils/coloredLetters";

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
  generateColoredLetter("#iconiq-l");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={styleIconiQ.fonty}>
            <div id="iconiq-l">iconiQ</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="lpage">
          <IonLoading message="logging..." duration={0} isOpen={loading} />

          <div className="login">
            <div className="redirect">
              <span>No Account?</span>
              <Link to={"/register"} className="link-">
                Register
              </Link>
            </div>

            <div className="form">
              <div className="input-control">
                <IonInput
                  type="text"
                  value={email}
                  className="input"
                  placeholder="Enter Email"
                  onIonChange={(e: any) => setEmail(e.detail.value)}
                ></IonInput>
              </div>
              <div className="input-control">
                <IonInput
                  type="password"
                  value={password}
                  className="input"
                  placeholder="Enter Password"
                  onIonChange={(e: any) => setPassword(e.detail.value)}
                ></IonInput>
              </div>
            </div>
            <div className="login-btn-container">
              <IonButton
                className="login-btn"
                color="secondary"
                size="large"
                onClick={login}
              >
                Login
              </IonButton>
              <Link to={!user ? "/home" : ""} id="no-auth">
                !Account && Enter
              </Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Login;
