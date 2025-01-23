import { useSignIn, useSignUp } from "@clerk/nextjs";

const useCustomSignIn = () => {
  const { signIn, setActive } = useSignIn();

  const handleSignIn = async (email, password) => {
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        return { success: true, message: "Sign-in successful!" };
      } else {
        return { success: false, message: "Unexpected status. Please try again." };
      }
    } catch (err) {
      return {
        success: false,
        message: err.errors?.[0]?.message || "An error occurred.",
      };
    }
  };

  return { handleSignIn };
};

const useCustomSignUp = () => {
    const { signUp } = useSignUp();
    
    const handleSignUp = async (email, password) => {
        try {
        const result = await signUp.create({
            emailAddress: email,
            password:password,
        });
    
        if (result.status === "complete") {
            return { success: true, message: "Sign-up successful!", user: result.user };
        } else {
            return { success: false, message: "Unexpected status. Please try again.", user: null};
        }
        } catch (err) {
        return {
            success: false,
            message: err.errors?.[0]?.message || "An error occurred.",
        };
        }
    };
    
    return { handleSignUp };
    }


export { useCustomSignIn, useCustomSignUp };