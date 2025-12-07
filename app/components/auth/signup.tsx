"use client";

import { signUp } from "@/app/actions/auth/signup";
import { UserFormData, userSchema } from "@/app/libs/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { BsExclamation } from "react-icons/bs";

export default function SignUp() {
  const currentDate = new Date();
  const initialDay = currentDate.getUTCDate();
  const initialMonthIndex = currentDate.getUTCMonth(); // 0 for Jan, 11 for Dec
  const initialYear = currentDate.getUTCFullYear();

  const _dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const yearOptions = Array.from({ length: 100 }, (_, i) => initialYear - i); // e.g., current year +/- 5

  const [focusedFields, setFocusedFields] = useState<string>("");
  const [signing, setSigning] = useState<boolean>(false);
  const [shouldShowFnameExclamationMark, setShouldShowFnameExclamationMark] =
    useState<boolean>(false);
  const [shouldShowLnameExclamationMark, setShouldShowLnameExclamationMark] =
    useState<boolean>(false);
  const [
    shouldShowBirthDayExclamationMark,
    setShouldShowBirthDayExclamationMark,
  ] = useState<boolean>(false);
  const [
    shouldShowCustomGenderExclamationMark,
    setShouldShowCustomGenderExclamationMark,
  ] = useState<boolean>(false);
  const [shouldShowEmailExclamationMark, setShouldShowEmailExclamationMark] =
    useState<boolean>(false);
  const [
    shouldShowPasswordExclamationMark,
    setShouldShowPasswordExclamationMark,
  ] = useState<boolean>(false);
  const [shouldShowCustomGenderBox, setShouldShowCustomGenderBox] =
    useState<boolean>(false);
  const [BYF, setBYF] = useState<boolean>(false);
  const [dayOptions, setDayOptions] = useState<number[]>(_dayOptions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setErr] = useState("");
  const monthShortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    watch,
    setError,
    trigger,
    setFocus,
    setValue,
    getValues,
  } = useForm<UserFormData>({
    mode: "onBlur",
    resolver: zodResolver(userSchema),
    reValidateMode: "onBlur",
  });

  const month = watch("birthmonth");
  const year = watch("birthyear");
  const router = useRouter();

  useEffect(() => {
    setValue("birthmonth", String(initialMonthIndex + 1));
    setValue("birthday", initialDay.toString());
    setValue("birthyear", initialYear.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);
  const registerUser = async (data: UserFormData) => {
    try {
      setSigning(true);
      const result = await signUp(data);
      if (result?.errors) {
        Object.entries(result?.errors).forEach(([field, message]) =>
          setError(field as keyof UserFormData, {
            type: "server",
            message,
          })
        );
      }

      if (result?.success) {
        await signIn("credentials", {
          isNewUser: true,
          id: result.id,
          email: data.email,
          firstName: data.fname,
          lastName: data.lname,
          profilePicture:
            data.gender === "male"
              ? "/brands/male-d.jpg"
              : "/brands/female-d.jpg",
          redirect: false,
        });

        router.push("/steps");
      }
    } catch (error) {
      console.log(error);
      setSigning(false);
    }
  };

  useEffect(() => {
    if (month && year) {
      const daysInMonth = new Date(
        parseInt(year),
        parseInt(month),
        0
      ).getDate();
      setDayOptions(Array.from({ length: daysInMonth }, (_, i) => i + 1));

      if (parseInt(getValues("birthday")) > parseInt(daysInMonth.toString())) {
        setValue("birthday", daysInMonth.toString());
      }
    }
  }, [getValues, month, setValue, year]);

  const handleFocus = (
    fieldName: keyof UserFormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    gender?: "male" | "female" | "custom"
  ) => {
    if (errors[fieldName] || isSubmitting) {
      setFocusedFields(fieldName);
    }

    switch (fieldName) {
      case "fname":
        setShouldShowFnameExclamationMark(false);
        break;

      case "lname":
        setShouldShowLnameExclamationMark(false);
        break;

      case "email":
        setShouldShowEmailExclamationMark(false);
        break;

      case "password":
        setShouldShowPasswordExclamationMark(false);
        break;
      case "birthday":
        setShouldShowBirthDayExclamationMark(false);
        break;

      case "birthmonth":
        setShouldShowBirthDayExclamationMark(false);
        break;

      case "birthyear":
        setShouldShowBirthDayExclamationMark(false);
        break;

      case "customgenderpronoun":
        setShouldShowCustomGenderExclamationMark(false);

      default:
        break;
    }
  };

  const handleBlur = async (fieldName: keyof UserFormData) => {
    setFocusedFields("");
    switch (fieldName) {
      case "fname":
        await trigger("fname");
        setShouldShowFnameExclamationMark(true);

        break;
      case "lname":
        await trigger("lname");
        setShouldShowLnameExclamationMark(true);

        break;

      case "email":
        await trigger("email");
        setShouldShowEmailExclamationMark(true);

        break;
      case "password":
        await trigger("password");
        setShouldShowPasswordExclamationMark(true);

        break;
      case "customgenderpronoun":
        await trigger("customgenderpronoun");
        setShouldShowCustomGenderExclamationMark(true);

      case "birthyear":
        await trigger("birthyear");
        setShouldShowBirthDayExclamationMark(true);
        setBYF(true);
      default:
        break;
    }
  };

  function handelClickGender(gender: string): void {
    switch (gender) {
      case "male":
        setShouldShowCustomGenderBox(false);
        setValue("gender", "male");
        setValue("customgenderpronoun", "");
        setError("customgenderpronoun", {
          message: undefined,
        });
        break;
      case "female":
        setShouldShowCustomGenderBox(false);
        setValue("gender", "female");
        setValue("customgenderpronoun", "");
        setError("customgenderpronoun", {
          message: undefined,
        });
        break;
      case "custom":
        setShouldShowCustomGenderBox(true);
        setValue("gender", "custom");
        setShouldShowCustomGenderExclamationMark(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <p className="text-5xl my-10 text-blue-600 font-bold text-center"></p>

      <div className="w-full bg-white rounded-lg shadow-xl">
        <div className="w-full border-b border-b-gray-100 py-2">
          <p className="my-1 text-2xl font-bold text-center">
            Create a new account
          </p>
          <p>{error}</p>
          <p className="my-1 text-center">It’s quick and easy.</p>
        </div>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 relative">
              {focusedFields === "fname" && errors.fname?.message && (
                <div className="absolute -left-[40%] text-sm z-10 py-4 -top-2 px-3 bg-red-700 text-white rounded-md">
                  {errors.fname?.message}
                </div>
              )}

              {focusedFields === "lname" && errors.lname?.message && (
                <div className="absolute  right-11 text-sm z-10 py-3 top-full mt-1 px-3 bg-red-700 text-white rounded-md">
                  {errors.lname?.message}
                </div>
              )}
              <div className={`w-full relative`}>
                <input
                  {...register("fname")}
                  onFocus={() => {
                    handleFocus("fname");
                  }}
                  onBlur={() => {
                    handleBlur("fname");
                  }}
                  type="text"
                  name="fname"
                  placeholder="First name"
                  className={`${
                    errors.fname && errors.fname.message
                      ? "border border-red-500"
                      : ""
                  }  block w-full px-2 py-1.5 border border-gray-400/55 rounded-sm placeholder:text-sm`}
                ></input>
                {shouldShowFnameExclamationMark &&
                  errors.fname &&
                  errors.fname.message && (
                    <BsExclamation
                      className="text-white w-4 h-4 rounded-full bg-red-800 absolute z-10 right-3 bottom-1/2 translate-y-1/2"
                      onClick={() => {
                        setShouldShowFnameExclamationMark(false);
                        handleFocus("fname");
                        setFocus("fname");
                      }}
                    />
                  )}
              </div>

              <div className={`w-full relative`}>
                <input
                  {...register("lname")}
                  onFocus={() => {
                    handleFocus("lname");
                  }}
                  onBlur={() => {
                    handleBlur("lname");
                  }}
                  name="lname"
                  type="text"
                  placeholder="Last name"
                  className={`${
                    errors.lname && errors.lname.message
                      ? "border border-red-500"
                      : ""
                  }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm placeholder:text-sm`}
                ></input>
                {shouldShowLnameExclamationMark &&
                  errors.lname &&
                  errors.lname.message && (
                    <BsExclamation
                      className="text-white w-4 h-4 rounded-full bg-red-800 absolute z-10 right-3 bottom-1/2 translate-y-1/2"
                      onClick={() => {
                        setShouldShowLnameExclamationMark(false);
                        handleFocus("lname");
                        setFocus("lname");
                      }}
                    />
                  )}
              </div>
            </div>
            <div className="flex items-center justify-between relative">
              <label className="my-2 block text-sm">Birthdate</label>
              {shouldShowBirthDayExclamationMark &&
                errors.birthyear &&
                errors.birthyear.message && (
                  <BsExclamation
                    className="text-white w-4 h-4 rounded-full bg-red-800 absolute z-10 right-3 bottom-1/2 translate-y-1/2"
                    onClick={() => {
                      handleFocus("birthyear");
                      setFocus("birthyear");
                      setBYF(false);
                    }}
                  />
                )}
            </div>
            <div className="grid grid-cols-3 gap-6 relative">
              {focusedFields === "birthyear" && errors.birthyear?.message && (
                <div className="absolute -left-[80%] w-3/4 text-xs z-10 py-4 -top-2 px-3 bg-red-700 text-white rounded-md">
                  {errors.birthyear?.message}
                </div>
              )}
              <select
                {...register("birthmonth")}
                name="birthmonth"
                onFocus={() => handleFocus("birthyear")}
                onBlur={() => {
                  handleBlur("birthyear");
                }}
                className={`${
                  errors.birthyear && errors.birthyear.message
                    ? "border border-red-500"
                    : ""
                }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm focus:border-0 focus:outline-2`}
              >
                {monthShortNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                {...register("birthday")}
                onFocus={() => handleFocus("birthyear")}
                onBlur={() => {
                  handleBlur("birthyear");
                }}
                name="birthday"
                className={`${
                  errors.birthyear && errors.birthyear.message
                    ? "border border-red-500"
                    : ""
                }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm focus:border-0 focus:outline-2`}
              >
                {dayOptions.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <div className={``}>
                <select
                  {...register("birthyear")}
                  name="birthyear"
                  onFocus={() => handleFocus("birthyear")}
                  onBlur={() => {
                    handleBlur("birthyear");
                  }}
                  className={`${
                    errors.birthyear && errors.birthyear.message
                      ? "border border-red-500"
                      : ""
                  }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm ${
                    BYF
                      ? "focus:border-0 focus:outline-2"
                      : "focus:border focus:outline-none"
                  }`}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="my-2 block text-sm">Gender</label>
            </div>
            <div className={`relative grid grid-cols-3 gap-6`}>
              {focusedFields === "gender" && errors.gender?.message && (
                <div className="absolute -left-[80%] w-3/4 text-xs z-10 py-4 -top-2 px-3 bg-red-700 text-white rounded-md">
                  {errors.gender?.message}
                </div>
              )}
              <div
                className={`cursor-default rounded-sm flex items-center justify-between px-2 py-1.5 border border-gray-400/55 ${
                  errors.gender && errors.gender.message
                    ? "border border-red-500"
                    : ""
                }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm`}
                onClick={() => handelClickGender("female")}
              >
                <span>Female</span>
                <input
                  {...register("gender")}
                  type="radio"
                  name="gender"
                  value="female"
                ></input>
              </div>
              <div
                className={`cursor-default rounded-sm flex items-center justify-between px-2 py-1.5 border border-gray-400/55 ${
                  errors.gender && errors.gender.message
                    ? "border border-red-500"
                    : ""
                }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm`}
                onClick={() => handelClickGender("male")}
              >
                <span>Male</span>
                <input
                  {...register("gender")}
                  type="radio"
                  name="gender"
                  value="male"
                ></input>
              </div>
              <div
                className={`cursor-default rounded-sm flex items-center justify-between px-2 py-1.5 border border-gray-400/55 ${
                  errors.gender && errors.gender.message
                    ? "border border-red-500"
                    : ""
                }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm`}
                onClick={() => handelClickGender("custom")}
              >
                <span>Custom</span>
                <input
                  {...register("gender")}
                  type="radio"
                  name="gender"
                  value="custom"
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-1 my-2 relative">
              {focusedFields === "customgenderpronoun" &&
                errors.customgenderpronoun?.message && (
                  <div className="absolute -left-[50%] text-sm z-10 py-4 -top-2 px-3 bg-red-700 text-white rounded-md">
                    {errors.customgenderpronoun?.message}
                  </div>
                )}
              {shouldShowCustomGenderBox && (
                <div className="">
                  <div className="relative w-full">
                    {shouldShowCustomGenderExclamationMark &&
                      errors.customgenderpronoun &&
                      errors.customgenderpronoun.message && (
                        <BsExclamation
                          className="text-white w-4 h-4 rounded-full bg-red-800 absolute z-10 right-5 bottom-1/2 translate-y-1/2"
                          onClick={() => {
                            setShouldShowCustomGenderExclamationMark(false);
                            handleFocus("customgenderpronoun");
                            setFocus("customgenderpronoun");
                          }}
                        />
                      )}
                    <select
                      {...register("customgenderpronoun")}
                      onFocus={() =>
                        handleFocus("customgenderpronoun", "custom")
                      }
                      onBlur={() => {
                        handleBlur("customgenderpronoun");
                      }}
                      className={`${
                        errors.customgenderpronoun &&
                        errors.customgenderpronoun.message
                          ? "border border-red-500"
                          : ""
                      }  w-full px-2 py-1.5 border border-gray-400/55 rounded-sm my-2 focus:border-0 focus:outline-2`}
                    >
                      <option value={""}>Select your pronoun</option>
                      <option className="she">
                        She: &quot;Wish her a happy birthday!&quot;
                      </option>
                      <option className="him">
                        Him: &quot;Wish him a happy birthday!&quot;
                      </option>
                      <option className="they">
                        They: &quot;Wish them a happy birthday!&quot;
                      </option>
                    </select>
                  </div>

                  <div className="w-full relative">
                    <input
                      {...register("customgender")}
                      type="text"
                      name="customgender"
                      placeholder="Gender (Optional)"
                      className="block w-full px-2 py-1.5 border border-gray-400/55 rounded-sm placeholder:text-sm"
                    ></input>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 my-2 relative">
              {focusedFields === "email" && errors.email?.message && (
                <div className="absolute -right-[40%] text-sm z-10 py-4 -top-2 px-3 bg-red-700 text-white rounded-md">
                  {errors.email?.message}
                </div>
              )}

              <div className="relative w-full">
                <input
                  {...register("email")}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => {
                    handleBlur("email");
                  }}
                  type="text"
                  name="email"
                  placeholder="Mobile number or email"
                  className={`${
                    errors.email && errors.email.message
                      ? "border border-red-500"
                      : ""
                  } px-2 py-1.5 border border-gray-400/55 rounded-sm w-full block text-sm`}
                ></input>
                {shouldShowEmailExclamationMark &&
                  errors.email &&
                  errors.email.message && (
                    <BsExclamation
                      className="cursor-default text-white w-4 h-4 rounded-full bg-red-800 absolute z-10 right-3 bottom-1/2 translate-y-1/2"
                      onClick={() => {
                        setShouldShowEmailExclamationMark(false);
                        handleFocus("email");
                        setFocus("email");
                      }}
                    />
                  )}
              </div>
            </div>
            <div className="grid grid-cols-1 my-2 relative">
              {focusedFields === "password" && errors.password?.message && (
                <div className="absolute -left-[80%] w-3/4 text-xs z-10 py-4 -top-2 px-3 bg-red-700 text-white rounded-md">
                  {errors.password?.message}
                </div>
              )}
              <div className="relative w-full">
                <input
                  {...register("password")}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => {
                    handleBlur("password");
                  }}
                  type="password"
                  name="password"
                  placeholder="New password"
                  className={`${
                    errors.password && errors.password.message
                      ? "border border-red-500"
                      : ""
                  } px-2 py-1.5 border border-gray-400/55 rounded-sm block w-full placeholder:text-sm`}
                ></input>
                {shouldShowPasswordExclamationMark &&
                  errors.password &&
                  errors.password.message && (
                    <BsExclamation
                      className="text-white w-4 h-4 rounded-full bg-red-800 absolute z-10 right-3 bottom-1/2 translate-y-1/2"
                      onClick={() => {
                        setShouldShowPasswordExclamationMark(false);
                        handleFocus("password");
                        setFocus("password");
                      }}
                    />
                  )}
              </div>
            </div>

            <div className="my-3">
              <p className="text-xs my-2">
                People who use our service may have uploaded your contact
                information to Facebook. Learn more.
              </p>

              <p className="text-xs my-2">
                By clicking Sign Up, you agree to our Terms, Privacy Policy and
                Cookies Policy. You may receive SMS Notifications from us and
                can opt out any time.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="cursor-pointer hover:bg-green-500 text-center block w-1/2 px-2 py-1.5 bg-green-600 text-white rounded-md"
              >
                {signing ? "Signing up" : "Sign up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
