import Heading from "../ui/Heading";
import useUser from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import Tag from "../ui/Tag";
import Textarea from "../ui/Textarea";

function NewUsers() {
  const { isUserLoading, userData } = useUser();

  const { email, fullName, avatar } = userData.user_metadata;

  if (isUserLoading) <Spinner />;

  return (
    <>
      <img
        src={avatar || "default-user.jpg"}
        style={{ width: 100, height: 100 }}
      />
      <Heading as="h1">Profile of {fullName}</Heading>
      <h4>Your email address is: {email}</h4>
    </>
  );
}

export default NewUsers;
