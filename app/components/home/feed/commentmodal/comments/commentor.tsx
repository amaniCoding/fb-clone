export default function Commentor({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  return (
    <p>
      {firstName} {lastName}
    </p>
  );
}
