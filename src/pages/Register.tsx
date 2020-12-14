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

import React, { useState } from "react";
import { Link } from "react-router-dom";
// loacal imports
import { generateColoredLetter, styleIconiQ } from "../utils/coloredLetters";
import { registerUser } from "../redux/firebaseRequests";
import { toast } from "../toast";
import "./Register.css";

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const register = async () => {
    setLoading(true);
    if (!email || !password || password !== cpassword) {
      setLoading(false);
      return;
    }
    const res = await registerUser(email, password);
    if (res) {
      toast("You have been registered", "success");
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  //randomly colored letters
  generateColoredLetter("#iconiq-r");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={styleIconiQ.fonty}>
            <div id="iconiq-r">IconiQ</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="rpage">
          <IonLoading message="Signing up..." duration={0} isOpen={loading} />
          <div className="register">
            <div className="account-redirect">
              <span>Already have Account? </span>
              <Link className="link" to={"/login"}>
                Login
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
              <div className="input-control">
                <IonInput
                  type="password"
                  className="input"
                  value={cpassword}
                  onChange={(e: any) => setcPassword(e.detail.value)}
                  placeholder="Confirm password"
                ></IonInput>
              </div>
            </div>
            <div className="register-btn-container">
              <IonButton
                size="large"
                className="register-btn"
                color="secondary"
                onClick={register}
              >
                Signup
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Register;
