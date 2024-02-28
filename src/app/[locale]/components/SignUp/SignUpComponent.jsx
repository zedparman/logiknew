"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSchemaSignUp } from "@/schema/validateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormik } from "formik";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { Link } from "@/navigations";
import toast from "react-hot-toast";

const SignUpComponent = ({ t }) => {
  const schemaValidate = validateSchemaSignUp(t);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confrimPassword: "",
    },
    validationSchema: schemaValidate,
    onSubmit: async (data) => {
      const { name, lastName, email, password } = data;
      console.log(name, lastName);
      const res = await axios.post(
        "/api/auth/signup",
        {
          name,
          lastName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status !== 200) {
        console.log(res);
        toast.error(res.response.data.message);
      } else {
        toast.success(t.successMessage);
        router.push("/signin");
        router.refresh();
      }
    },
  });
  return (
    <div className="flex items-center justify-center flex-col p-5">
      <div className="flex items-center flex-col gap-5 border border-primary p-6 rounded-lg bg-card ">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p>{t.subTitle}</p>

        <form
          className="flex flex-col gap-5 w-full "
          onSubmit={formik.handleSubmit}
        >
          <div className="space-y-2">
            <Label>{t.name}</Label>
            <Input
              type="text"
              name="name"
              className="border border-primary"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t.lastName}</Label>
            <Input
              type="text"
              name="lastName"
              className="border border-primary"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.lastName && (
              <p className="text-xs text-red-500">{formik.errors.lastName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t.email}</Label>
            <Input
              type="text"
              name="email"
              className="border border-primary"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t.password}</Label>
            <Input
              type="password"
              name="password"
              className="border border-primary"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t.retypePassword}</Label>
            <Input
              type="password"
              name="confrimPassword"
              className="border border-primary"
              value={formik.values.confrimPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confrimPassword && (
              <p className="text-xs text-red-500">
                {formik.errors.confrimPassword}
              </p>
            )}
          </div>
          <p className="flex gap-2 text-sm">
            {t.HaveAccount}
            <span className="text-primary">
              <Link href="/signin">{t.SignIn}</Link>
            </span>
          </p>
          <Button
            type="submit"
            className="text"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {t.submit}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
