import { useEffect, useRef, useState } from "react";
import styles from "./IngredientFormField.module.css";

interface ListItem {
  id: string;
  text: string;
}

interface IngredientFormFieldProps {
  ingredients: ListItem[];
  units: ListItem[];
}
export default function IngredientFormField({
  ingredients,
}: IngredientFormFieldProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState<
    { id: string; text: string }[]
  >([]);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    if (searchTerm.length > 1) {
      setFilteredList(
        ingredients.filter(({ text }) => text.includes(searchTerm))
      );
    } else {
      setFilteredList([]);
    }
  }, [searchTerm, ingredients]);
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <IngredientField
          filteredList={filteredList}
          onUpdate={setSearchTerm}
          searchTerm={searchTerm}
          onSelect={() => {}}
        />
        <div className={styles.spacer} />
        <input size={1} placeholder="Amount"></input>
        <div className={styles.spacer} />
        <input size={1} placeholder="Unit"></input>

        {filteredList.length > 0 && (
          <div className={styles.options}>
            {filteredList.map(({ id, text }) => (
              <SearchOption
                key={id}
                text={text}
                matchingText={searchTerm}
                onSelect={() => {
                  // setSelectedText(text);
                  // setSearchTerm("");
                  // onSelect(id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface IngredientFieldProps {
  filteredList: ListItem[];
  onSelect: (id: string) => void;
  onUpdate: (text: string) => void;
  searchTerm: string;
}

function IngredientField({
  filteredList,
  onUpdate,
  searchTerm,
}: IngredientFieldProps) {
  return (
    <div className={styles.ingredientContainer}>
      <input
        size={1}
        className={styles.input}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Ingredient"
      />
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
    <div className={styles.searchOption} onClick={onSelect}>
      <span>{before}</span>
      <span className={styles.match}>{matchingText}</span>
      <span>{after}</span>
    </div>
  );
}
