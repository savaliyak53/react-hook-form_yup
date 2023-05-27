import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; //use for connect yup and form

const GENDER_OPTION = [
  { text: "male", value: "male" },
  { text: "female", value: "female" },
  { text: "other", value: "other" },
];

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .email("This must be a valide email")
      .required("email is required"),
    phone: yup.string().required("Phone no is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "The password must be of six charcter"),
    conformPassword: yup
      .string()
      .required("Conform-password is required")
      .min(6, "Conform-password must be of six charcters")
      .oneOf([yup.ref("password"), "your pass does not match"]),
  })
  .required();

const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => console.log(values);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-3">User Register form</h3>
      <div className="form-group">
        <label htmlFor="firstName float-left">First Name</label>
        <input
          type="text"
          className="form-control"
          {...register("firstName", {
            required: true, //without yup
          })}
        />
        {errors.firstName && (
          <span className="filed_level_error">{errors.firstName.message}</span> //end without yup
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">last Name</label>
        <input type="text" className="form-control" {...register("lastName")} />
        {errors.lastName && (
          <span className="filed_level_error">{errors.lastName.message}</span> //with yup
        )}
      </div>

      <div className="form-group mb-2">
        <label htmlFor="gender">Gender</label>
        <select className="form-control" {...register("gender")}>
          <option value="">select option</option>
          {GENDER_OPTION.map((gender, index) => (
            <option key={index} value={gender.value}>
              {gender.text}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className="filed_level_error">{errors.gender.message}</span> //end without yup
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" {...register("email")} />
        {errors.email && (
          <span className="filed_level_error">{errors.email.message}</span> //end without yup
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="phone" className="form-control" {...register("phone")} />
        {errors.phone && (
          <span className="filed_level_error">{errors.phone.message}</span> //end without yup
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          {...register("password")}
        />
        {errors.password && (
          <span className="filed_level_error">{errors.password.message}</span> //end without yup
        )}
      </div>

      <div className="form-group">
        <label htmlFor="conformpassword">Conform Password</label>
        <input
          type="password"
          className="form-control"
          {...register("conformpassword")}
        />
        {errors.conformPassword && (
          <span className="filed_level_error">
            {errors.conformPassword.message}
          </span> //end without yup
        )}
      </div>

      <button type="submit" className=" btn btn-primary mt-3">
        submit
      </button>
    </form>
  );
};

export default UserRegistrationForm;
