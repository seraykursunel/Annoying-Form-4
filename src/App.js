import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    console.log(formData)
    function hijackResults() {
      let string = "";

      if (name === "firstName") {
        string = "Namık";
      } else if (name === "lastName") {
        string = "Korona";
      } else {
        string = "NamıkKorona@gmail.com";
      }

      return string.slice(0, value.length);
    }

    function switcharoo(event) {
      if (value === "no" && formData.privacyResponse === "yes") {
        return "absolutely";
      } else if (value === "no" && formData.privacyResponse === "absolutely") {
        return "yes";
      } else {
        return value;
      }
    }

    let dataToRecord;

    if (name === "firstName" || name === "lastName" || name === "email") {
      dataToRecord = hijackResults();
    } else if (type === "radio") {
      dataToRecord = switcharoo(event);
    } else {
      dataToRecord = type === "checkbox" ? checked : value;
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: dataToRecord
      };
    });
  }

  function fakeSubmit(e) {
    e.preventDefault();
    setFormData((prev) => ({
      ...formData,
      wantsToSubmit: !prev.wantsToSubmit
    }));
  }

  useEffect(() => {
    if (formData.rating !== "10") {
      setTimeout(() => {
        setFormData({ ...formData, rating: "10" });
      }, 2000);
    }

    if (!formData.marketingResponse) {
      setTimeout(() => {
        setFormData({ ...formData, rating: "10", marketingResponse: true });
      }, 2000);
    }
  });

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    privacyResponse: "yes",
    rating: "10",
    marketingResponse: true,
    wantsToSubmit: false
  });

  return (
    <form onSubmit={fakeSubmit}>
      <h1>Dünyanın En Sinir Bozucu Formu</h1>

      <input
        type="text"
        placeholder="Adı"
        onChange={handleChange}
        name="firstName"
        value={formData.firstName}
      />

      <input
        type="text"
        placeholder="Soyadı"
        onChange={handleChange}
        name="lastName"
        value={formData.lastName}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={formData.email}
      />

      <fieldset>
        <legend>
          Gizlilikle ilgili tüm haklarınızdan feragat etmek ister misiniz?
        </legend>
        <div className="privacy-container">
          <label>
            <input
              type="radio"
              id="yes"
              name="privacyResponse"
              value="yes"
              onChange={handleChange}
              checked={formData.privacyResponse === "yes"}
            />
           Evet
          </label>

          <label>
            <input
              type="radio"
              id="no"
              name="privacyResponse"
              value="no"
              onChange={handleChange}
              defaultChecked
              checked={formData.privacyResponse === "no"}
            />
            Hayır
          </label>

          <label>
            <input
              type="radio"
              id="absolutely"
              name="privacyResponse"
              value="absolutely"
              onChange={handleChange}
              checked={formData.privacyResponse === "absolutely"}
            />
            Kesinlikle
          </label>
        </div>
      </fieldset>

      <fieldset className="rating-container">
        <legend>
          Bu formu 1-10 arasında, 1 en kötü ve 10 en iyi olmak üzere nasıl
          değerlendirirsiniz?
        </legend>

        <select onChange={handleChange} name="rating" defaultValue={formData.rating} value={formData.rating}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </fieldset>

      <label className="marketing-label">
        <input
          type="checkbox"
          name="marketingResponse"
          onChange={handleChange}
          checked={formData.marketingResponse}
        />

        <div className="checkmark"></div>
        <span>Günde 20 pazarlama maili almak istiyorum. </span>
      </label>

      <button
        className={formData.wantsToSubmit ? "move" : ""}
        onFocus={fakeSubmit}
        onMouseEnter={fakeSubmit}
      >
        Gönder
      </button>
    </form>
  );
}
