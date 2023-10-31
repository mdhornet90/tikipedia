import { useEffect, useState } from "react";
import styles from "./IngredientField.module.css";

interface IngredientFieldProps {
  ingredients: ListItem[];
  text: string;
  onSelect: (name: string) => void;
}

export default function IngredientField({
  text,
  ingredients,
  onSelect,
}: IngredientFieldProps) {
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState<ListItem[]>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setFilteredList(
        ingredients.filter(({ text }) => text.includes(searchTerm))
      );
    } else {
      setFilteredList([]);
    }
  }, [searchTerm, ingredients]);

  useEffect(() => {
    if (!searching) {
      setSearchTerm("");
    }
  }, [searching]);

  return (
    <div className={styles.ingredientContainer}>
      <input
        onFocus={() => {
          setSearching(true);
        }}
        size={1}
        className={styles.input}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ingredient"
        onBlur={() => {
          setSearching(false);
        }}
        value={searching ? searchTerm : text}
      />

      {filteredList.length > 0 && (
        <div className={styles.options}>
          {filteredList.map(({ id, text }) => (
            <SearchOption
              key={id}
              text={text}
              matchingText={searchTerm}
              onSelect={() => {
                onSelect(text);
                setSearching(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SearchOptionProps {
  text: string;
  matchingText: string;
  onSelect: () => void;
}

function SearchOption({ text, matchingText, onSelect }: SearchOptionProps) {
  const start = text.indexOf(matchingText);
  if (start < 0) {
    return <div className={styles.searchOption}>{text}</div>;
  }

  const last = start + matchingText.length;

  const before = text.substring(0, start);
  const after = text.substring(last);

  return (
    <div className={styles.searchOption} onMouseDown={onSelect}>
      <span>{before}</span>
      <span className={styles.match}>{matchingText}</span>
      <span>{after}</span>
    </div>
  );
}
