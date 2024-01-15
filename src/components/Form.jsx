import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

const Form = () => {
  const {
    handleSubmit,
    register,
    reset,
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
      }}
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.375rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "24rem",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          Register
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#4b5563",
            }}
            htmlFor="name"
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
            style={{
              marginTop: "0.25rem",
              padding: "0.5rem",
              border: errors.name ? "1px solid #e53e3e" : "1px solid #d2d6dc",
              borderRadius: "0.25rem",
              width: "100%",
            }}
          />
          {errors.name && (
            <p
              style={{
                color: "#e53e3e",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.name.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#4b5563",
            }}
            htmlFor="email"
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
            style={{
              marginTop: "0.25rem",
              padding: "0.5rem",
              border: errors.email ? "1px solid #e53e3e" : "1px solid #d2d6dc",
              borderRadius: "0.25rem",
              width: "100%",
            }}
          />
          {errors.email && (
            <p
              style={{
                color: "#e53e3e",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#4b5563",
            }}
            htmlFor="password"
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
            style={{
              marginTop: "0.25rem",
              padding: "0.5rem",
              border: errors.password
                ? "1px solid #e53e3e"
                : "1px solid #d2d6dc",
              borderRadius: "0.25rem",
              width: "100%",
            }}
          />
          {errors.password && (
            <p
              style={{
                color: "#e53e3e",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#4b5563",
            }}
            htmlFor="confirmPassword"
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
            style={{
              marginTop: "0.25rem",
              padding: "0.5rem",
              border: errors.confirmPassword
                ? "1px solid #e53e3e"
                : "1px solid #d2d6dc",
              borderRadius: "0.25rem",
              width: "100%",
            }}
          />
          {errors.confirmPassword && (
            <p
              style={{
                color: "#e53e3e",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!isValid}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            background: isValid ? "#1e40af" : "#cbd5e0",
            color: "white",
            borderRadius: "0.25rem",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
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
          <div
            style={{ minHeight: "100vh", padding: "1rem", textAlign: "center" }}
          >
            <Transition.Child
              as={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              style={{ display: "inline-block", verticalAlign: "middle" }}
            >
              <Dialog.Overlay
                style={{
                  position: "fixed",
                  inset: 0,
                }}
              />
              <div
                style={{
                  display: "inline-block",
                  maxWidth: "30rem",
                  padding: "3rem",
                  margin: "8% auto",
                  background: "white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.375rem",
                }}
              >
                <Dialog.Title
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    color: "#1a202c",
                  }}
                >
                  Registration Successful
                </Dialog.Title>
                <div style={{ marginTop: "0.5rem" }}>
                  <p style={{ fontSize: "1.5rem", color: "#4b5563" }}>
                    Your registration was successful!
                  </p>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      padding: "0.5rem 1rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "white",
                      background: "#1e40af",
                      border: "none",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                    }}
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
