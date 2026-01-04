import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const token = Cookies.get("token");

      if (!token) {
        router.push("/authentication/login");
      } else {
        setVerified(true);
      }
    }, [router]);

    if (!verified) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
