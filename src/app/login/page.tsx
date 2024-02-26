"use client";

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { onLoginSuccess } from "@/redux/auth/authSlice"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const LoginPage = () => {

    const dispatch = useDispatch();

    const { user, isLoggedIn } = useSelector(state => state.auth)

    console.log(user);

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [userLogin, setUserLogin] = useState({ username: '', password: '' });

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(onLoginSuccess(formData));
    };
    return (
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Crediamo che un mondo in cui tutto è connesso sia un mondo migliore, noi lavoriamo per arrivarci il prima possibile.&rdquo;
                            </p>
                            <footer className="text-sm">New Changer</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {isLoggedIn ? "Welcome" : "Create an account"}
                            </h1>
                            {!isLoggedIn && (
                                <p className="text-sm text-muted-foreground">
                                    Enter your email below to create your account
                                </p>
                            )}
                        </div>
                        <div className="grid gap-6">
                            {isLoggedIn && (
                                <>
                                    <p>email: {user.username}</p>
                                    <p>password: {user.password}</p>
                                </>
                            )}
                            {!isLoggedIn && (
                                <form onSubmit={onHandleSubmit}>
                                    <div className="grid gap-2">
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="username">
                                                Email
                                            </Label>
                                            <Input
                                                id="username"
                                                placeholder="name@example.com"
                                                type="username"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                name="username"
                                                onChange={onHandleChange}
                                            />
                                        </div>
                                        <div className="grid gap-1">
                                            <Label className="sr-only" htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                type="password"
                                                autoCorrect="off"
                                                name="password"
                                                onChange={onHandleChange}
                                            />
                                        </div>
                                        <Button type="submit">
                                            Sign In with Email
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage