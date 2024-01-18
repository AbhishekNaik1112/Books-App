import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Forms() {
  const [submitBool, setSubmitBool] = useState(false);
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onFormSubmit = (data) => {
    setSubmitBool(true);
  };

  function renderFormField(labelText, name, rules) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700">
          {labelText}
        </label>
        <input
          type={name.includes("password") ? "password" : "text"}
          placeholder={labelText}
          autoComplete="false"
          className="w-full p-2 border rounded mt-1"
          {...register(name, rules)}
        />
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors[name].type === "required" && `${labelText} is required`}
            {errors[name].type === "minLength" &&
              `${labelText} should have a minimum of 3 characters`}
            {errors[name].type === "maxLength" &&
              `${labelText} can only have a maximum of 30 characters`}
            {errors[name].type === "pattern" &&
              `Enter a valid ${labelText.toLowerCase()}`}
            {errors[name].type === "validate" && "Passwords must match"}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="mb-8 text-2xl sm:text-4xl font-bold text-red-600">
        <NavLink to="/">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Kalvium Books
          </motion.h2>
        </NavLink>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full sm:max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg mb-4"
        >
          Sign Up now to read your favorite books!
        </motion.p>
        {submitBool ? (
          <motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              Registration Successful!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4"
            >
              Read with joy ❤️!
            </motion.p>
            <motion.button
              onClick={() => Navigate("/")}
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go Back
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit(onFormSubmit)}
          >
            {renderFormField("Name", "firstName", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            {renderFormField("Email", "email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            {renderFormField("Password", "password", {
              required: true,
              minLength: 10,
              pattern: /.*[\W]+.*/i,
            })}
            {renderFormField("Confirm password", "confirmPassword", {
              validate: (value) => value === watch("password"),
            })}

            <div className="flex items-center justify-between mt-4 sm:mt-8">
              <motion.button
                type="submit"
                disabled={Object.keys(errors).length !== 0}
                className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded"
                whileHover={{ scale: 1.05 }}
              >
                Sign Up
              </motion.button>
              <div className="ml-4">
                <span className="text-gray-600">Or sign up with:</span>
                <button className="ml-2 p-2 bg-red-600 text-white rounded">
                  Google
                </button>
                <button className="ml-2 p-2 bg-blue-500 text-white rounded">
                  Facebook
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
}

export default Forms;
