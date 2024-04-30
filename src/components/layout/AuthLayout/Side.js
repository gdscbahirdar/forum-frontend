import React, { cloneElement } from "react";
import { Avatar } from "components/ui";
import Logo from "components/template/Logo";
import { APP_NAME } from "constants/app.constant";

const Side = ({ children, content, ...rest }) => {
  return (
    <div className="grid lg:grid-cols-3 h-full">
      <div
        className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-center hidden lg:flex"
        style={{ backgroundImage: `url('/img/others/auth-side-bg.jpg')` }}
      >
        <div>
          <div className="mb-6 flex items-center gap-4">
            <Avatar
              className="border-2 border-white"
              shape="circle"
              src="/img/avatars/albert.jpeg"
            />
            <div className="text-white">
              <div className="font-semibold text-base">Albert Einstein</div>
              <span className="opacity-80">Theoretical physicist</span>
            </div>
          </div>
          <p className="text-lg text-white text-justify opacity-80">
            <i>
              If I had an hour to solve a problem and my life depended on the
              solution, I would spend the first 55 minutes determining the
              proper question to ask… for once I know the proper question, I
              could solve the problem in less than five minutes.
            </i>
          </p>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
        <div className="xl:min-w-[450px] px-8">
          <div className="mb-8">{content}</div>
          {children ? cloneElement(children, { ...rest }) : null}
        </div>
      </div>
    </div>
  );
};

export default Side;
