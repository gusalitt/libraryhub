import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, BookOpen, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import { formattedErrors } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
	const navigate = useNavigate();
	const { triggerUserFetch, user, setUser } = useAuth();
	const { mutate, isPending, error } = useMutation({
		mutationFn: (data) => registerUser(data),
		onSuccess: (data) => {
			// Set a temporary flag to indicate that login was just performed manually.
			// This prevents double navigation caused by the RedirectIfAuthenticated guard component.
			sessionStorage.setItem("just_logged_in", true);
			if (!user) setUser(data?.data?.user);
			triggerUserFetch();
			setErrors({});
			setFormData({
				name: "",
				email: "",
				password: "",
			});
			navigate(-1, { replace: true });

			// Remove the temporary flag after a short delay to avoid issues with subsequent navigations.
			setTimeout(() => {
				sessionStorage.removeItem("just_logged_in");
			}, 1000);
		},
		onError: (error) => {
			if (error.response?.data?.errors) {
				const formatted = formattedErrors(error.response?.data?.errors);
				setErrors(formatted);
			}
		},
	});
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Full name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			mutate(formData);
		}
	};

	return (
		<div className="min-h-screen bg-white flex">
			{/* Left Side - Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
				<div className="w-full max-w-md">
					{/* Back Button */}
					<Link to={"/"}>
						<Button variant="link" className="pl-0 flex items-center text-gray-600! hover:text-black! mb-8 transition-colors">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Home
						</Button>
					</Link>

					{/* Mobile Logo */}
					<div className="lg:hidden flex items-center space-x-2 mb-8">
						<div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
							<BookOpen className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-2xl font-bold text-black">LibraryHub</h1>
					</div>

					<div className="mb-8">
						<h2 className="text-4xl font-bold text-black mb-2">Create Account</h2>
						<p className="text-gray-600">Join thousands of readers and start your journey today.</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-black mb-2">
								Full Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className={`text-black w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all text-lg ${errors?.name ? "border-red-500" : "border-gray-200"}`}
								placeholder="Enter your full name"
							/>
							{errors?.name && <p className="mt-2 text-sm text-red-600">{errors?.name}</p>}
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-black mb-2">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className={`text-black w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all text-lg ${errors?.email ? "border-red-500" : "border-gray-200"}`}
								placeholder="Enter your email"
							/>
							{errors?.email && <p className="mt-2 text-sm text-red-600">{errors?.email}</p>}
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-black mb-2">
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className={`text-black w-full px-4 py-4 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all text-lg ${errors?.password ? "border-red-500" : "border-gray-200"}`}
									placeholder="Create a password"
								/>
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
									{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
								</button>
							</div>
							{errors?.password && <p className="mt-2 text-sm text-red-600">{errors?.password}</p>}
						</div>

						<div className="flex items-start">
							<input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black mt-1" />
							<span className="ml-2 text-sm text-gray-600">
								I agree to the{" "}
								<a href="#" className="text-black hover:text-gray-700 font-medium">
									Terms of Service
								</a>{" "}
								and{" "}
								<a href="#" className="text-black hover:text-gray-700 font-medium">
									Privacy Policy
								</a>
							</span>
						</div>

						<Button variant={isPending ? "outline" : "default"} disabled={isPending} className="bg-black! text-white! w-full py-7 px-4 rounded-xl text-[1.1rem]">
							{isPending && <Loader className="mr-5" />} Create Account
						</Button>
					</form>

					<div className="mt-8">
						{/* <div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or sign up with</span>
							</div>
						</div> */}

						{/* <div className="mt-6 grid grid-cols-2 gap-3">
							<button className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
								<svg className="w-5 h-5" viewBox="0 0 24 24">
									<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
									<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
									<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
									<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
								</svg>
								<span className="ml-2">Google</span>
							</button>

							<button className="w-full inline-flex justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								<span className="ml-2">Facebook</span>
							</button>
						</div> */}
					</div>

					<p className="mt-8 text-center text-gray-600">
						Already have an account?{" "}
						<Button onClick={() => navigate('/login', { replace: true })} variant="link" className="text-black! pl-1 pt-0 text-[1rem] hover:text-gray-700! font-medium">
							Sign In
						</Button>
					</p>
				</div>
			</div>

			{/* Right Side - Benefits/Stats */}
			<div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-center items-center p-10 pt-0">
				<div className="max-w-xl">
					<h2 className="text-5xl font-bold text-white mb-8 leading-tight">Join Our Reading Community</h2>

					<p className="text-lg text-gray-500 mb-12 leading-relaxed">Discover thousands of books, connect with fellow readers, and track your reading journey.</p>

					{/* Stats */}
					{/* <div className="grid grid-cols-2 gap-8 mb-12">
						<div className="text-center">
							<div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl mx-auto mb-4">
								<BookOpen className="w-8 h-8 text-black" />
							</div>
							<div className="text-3xl font-bold text-white mb-2">10,000+</div>
							<div className="text-gray-500">Books Available</div>
						</div>
						<div className="text-center">
							<div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl mx-auto mb-4">
								<Users className="w-8 h-8 text-black" />
							</div>
							<div className="text-3xl font-bold text-white mb-2">50,000+</div>
							<div className="text-gray-500">Active Readers</div>
						</div>
					</div> */}

					{/* Benefits */}
					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
								<div className="w-2 h-2 bg-white rounded-full"></div>
							</div>
							<div>
								<h4 className="font-bold text-white mb-1">Unlimited Access</h4>
								<p className="text-gray-500">Read as many books as you want, whenever you want.</p>
							</div>
						</div>
						<div className="flex items-start space-x-4">
							<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
								<div className="w-2 h-2 bg-white rounded-full"></div>
							</div>
							<div>
								<h4 className="font-bold text-white mb-1">Sync Across Devices</h4>
								<p className="text-gray-500">Continue reading on any device, your progress is always saved.</p>
							</div>
						</div>
						<div className="flex items-start space-x-4">
							<div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
								<div className="w-2 h-2 bg-white rounded-full"></div>
							</div>
							<div>
								<h4 className="font-bold text-white mb-1">Personalized Recommendations</h4>
								<p className="text-gray-500">Discover new books based on your reading preferences.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
