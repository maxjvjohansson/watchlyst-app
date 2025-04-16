import Button from "@/elements/Button";

export default function SearchPanel() {
  return (
    <form>
      <div>
        <Button type="button">Movies</Button>
        <Button type="button">Series</Button>
      </div>

      <Button type="submit">Get Recommendations</Button>
    </form>
  );
}
