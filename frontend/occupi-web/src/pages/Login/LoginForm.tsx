import { useState } from "react";
import {loginpng, occupi_logo} from "@assets/index";
import { Checkbox, GradientButton, InputBox } from "@components/index";

const LoginForm = (): JSX.Element => {

  const [form, setForm] = useState<{
    email: string, 
    password: string, 
    valid_email: boolean, 
    valid_password: boolean
  }>({email: "", password: "", valid_email: false, valid_password: false});

  return (
    <div className="flex justify-center w-screen h-screen items-center">
      <div className="w-[60vw] h-[40vw] flex justify-center items-center">
        <div className="w-[40vw] h-[40vw]">
          <img className="min-w-[100%] h-[100%] inline m-auto object-cover" src={loginpng} alt="welcomes" />
        </div>
      </div>
        <div className="w-[30vw] ml-10 mr-3 flex flex-col items-center">
          <div className="w-[10vw] h-[10vw] mt-[7rem]">
              <img className="min-w-[100%] h-[100%] inline m-auto object-cover"
                alt="Frame"
                src={occupi_logo}
              />
          </div>
          <h2 className="w-[30vw] text-text_col font-semibold text-5xl mt-2">Welcome back to Occupi.</h2>
          <h3 className="w-[30vw] text-text_col font-extralight text-2xl mt-4">Predict. Plan. Perfect</h3>

          <InputBox
            type="email"
            placeholder="Enter your email address"
            label="Email Address"
            submitValue={(val, validity) => {
              setForm({ ... form, email : val})
              setForm({ ... form, valid_password: validity})
            }}
          />
          <InputBox
            type="password"
            placeholder="Enter your password"
            label="Password"
            submitValue={(val, validity) => {
              setForm({ ... form, email : val})
              setForm({ ... form, valid_email: validity})
            }}
          />

          <div className="w-full flex justify-between mt-5">
            <div className="flex items-center">
              <Checkbox id="rememberMeCheckbox" />
              <p className="text-text_col_green_leaf cursor-pointer ml-2 text-text_col">Remember me</p>
            </div>

            <p className="text-text_col_green_leaf cursor-pointer text-text_col">Forgot Password?</p>
          </div>
          
          <div className="mt-5 w-full">
            <GradientButton Text="Login" isClickable={form.valid_email && form.valid_password} clickEvent={() => {}}/>
          </div>

          <div className="flex items-center justify-center mt-5 mb-5">
            <p className="text-text_col">New to occupi?</p>
            <p className="ml-2 text-text_col_green_leaf cursor-pointer">Learn more</p>
          </div>
        </div>
    </div>
  );
};

export default LoginForm;