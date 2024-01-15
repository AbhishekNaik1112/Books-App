import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

const Form = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
    getValues,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsModalOpen(true);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const watchUsername = watch("name", "");
  const watchEmail = watch("email", "");
  const watchPassword = watch("password", "");
  const watchConfirmPassword = watch("confirmPassword", "");

  console.log(
    watchUsername,
    " ",
    watchEmail,
    " ",
    watchPassword,
    " ",
    watchConfirmPassword
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-6">Register</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            autoComplete="false"
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name should not exceed 30 characters",
              },
            })}
            className={`mt-1 px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded w-full`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            autoComplete="false"
            id="email"
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            className={`mt-1 px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded w-full`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            autoComplete="false"
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 10,
                message: "Password should be at least 10 characters",
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*])/,
                message: "Password must contain at least one special character",
              },
            })}
            className={`mt-1 px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded w-full`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Repeat Password
          </label>
          <input
            autoComplete="false"
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className={`mt-1 px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded w-full`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!isValid}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full p-4 text-white rounded cursor-${
            isValid ? "pointer" : "not-allowed"
          } ${isValid ? "bg-indigo-600" : "bg-gray-400"}`}
        >
          Register
        </motion.button>
      </motion.form>

      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen p-4 text-center">
            <Transition.Child
              as={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="inline-block align-middle"
            >
              <Dialog.Overlay className="fixed inset-0" />
              <div className="max-w-md p-12 mx-auto bg-white rounded shadow-md">
                <Dialog.Title className="text-2xl font-semibold text-gray-800">
                  Registration Successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-xl text-gray-600">
                    Your registration was successful!
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-white font-semibold bg-indigo-600 border border-transparent rounded cursor-pointer"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Form;
