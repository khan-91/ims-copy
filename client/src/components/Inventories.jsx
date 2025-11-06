// import React, { useState } from "react";

// const Inventories = () => {

//   // const [title, setTitle] = useState("");
//   // const [description, setDescription] = useState("");
//   // const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
//   // const [tagsText, setTagsText] = useState(""); // comma separated
//   // const [isPublic, setIsPublic] = useState(false);
//   // const [imageFile, setImageFile] = useState(null);
//   // const [imagePreview, setImagePreview] = useState(null);

//   // const [errors, setErrors] = useState({});
//   // const [loading, setLoading] = useState(false);
//   // const [serverError, setServerError] = useState("");


//   return (
//     <div className="mx-8">
//       Inventories
//       <div>
//         <div>
//           <h2>Add Inventory</h2>
//           <form
//       onSubmit={handleSubmit}
//       className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4"
//     >
//       {/* Title */}
//       <div>
//         <label className="block font-semibold mb-1">Title</label>
//         <input
//           type="text"
//           name="title"
//           value={formValues.title}
//           onChange={handleChange}
//           placeholder="Inventory Title"
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block font-semibold mb-1">Description</label>
//         <textarea
//           name="description"
//           value={formValues.description}
//           onChange={handleChange}
//           placeholder="Inventory Description"
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {/* Category */}
//       <div>
//         <label className="block font-semibold mb-1">Category</label>
//         <select
//           name="category"
//           value={formValues.category}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="EQUIPMENT">Equipment</option>
//           <option value="FURNITURE">Furniture</option>
//           <option value="BOOK">Book</option>
//           <option value="OTHER">Other</option>
//         </select>
//       </div>

//       {/* Tags */}
//       <div>
//         <label className="block font-semibold mb-1">Tags (comma separated)</label>
//         <input
//           type="text"
//           name="tags"
//           value={formValues.tags.join(", ")}
//           onChange={handleTagChange}
//           placeholder="e.g. Laptop, Office, IT"
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {/* Image URL */}
//       <div>
//         <label className="block font-semibold mb-1">Image URL (optional)</label>
//         <input
//           type="text"
//           name="imageUrl"
//           value={formValues.imageUrl}
//           onChange={handleChange}
//           placeholder="https://example.com/image.jpg"
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {/* Public toggle */}
//       <div className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           name="isPublic"
//           checked={formValues.isPublic}
//           onChange={handleChange}
//         />
//         <label className="font-semibold">Make inventory public</label>
//       </div>

//       {/* Submit Button */}
//       <div>
//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
//         >
//           Add Inventory
//         </button>
//       </div>
//     </form>

//         </div>
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default Inventories;  6.10
import React, { useState } from "react";

const Inventories = ({ onChange, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    imageUrl: "",
    isPublic: false,
    customFields: [],
    accessUsersInput: "",
    accessUsers: [],
  });

  // Handle normal input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormValues((prev) => ({ ...prev, [name]: val }));
    if (onChange) onChange(name, val);
  };

  // Handle tags input
  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((t) => t.trim());
    setFormValues((prev) => ({ ...prev, tags }));
    if (onChange) onChange("tags", tags);
  };

  // Handle custom field changes
  const handleCustomFieldChange = (index, key, value) => {
    const newFields = [...formValues.customFields];
    newFields[index][key] = value;
    setFormValues((prev) => ({ ...prev, customFields: newFields }));
  };

  // Add a new custom field
  const addCustomField = () => {
    setFormValues((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { title: "", type: "SINGLE_LINE" }],
    }));
  };

  // Remove a custom field
  const removeCustomField = (index) => {
    const newFields = [...formValues.customFields];
    newFields.splice(index, 1);
    setFormValues((prev) => ({ ...prev, customFields: newFields }));
  };

  // Handle access user input
  const handleAccessUserInput = (e) => {
    setFormValues((prev) => ({ ...prev, accessUsersInput: e.target.value }));
  };

  // Add access user when Enter key is pressed
  const addAccessUser = (user) => {
    if (!user) return;
    setFormValues((prev) => ({
      ...prev,
      accessUsers: [...prev.accessUsers, user],
      accessUsersInput: "",
    }));
  };

  const removeAccessUser = (index) => {
    const newUsers = [...formValues.accessUsers];
    newUsers.splice(index, 1);
    setFormValues((prev) => ({ ...prev, accessUsers: newUsers }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formValues);
  };

  // Handle Enter key for access user input
  const handleAccessUserKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAccessUser(formValues.accessUsersInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4">
      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="Inventory Title"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Inventory Description"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          name="category"
          value={formValues.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="EQUIPMENT">Equipment</option>
          <option value="FURNITURE">Furniture</option>
          <option value="BOOK">Book</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-semibold mb-1">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formValues.tags.join(", ")}
          onChange={handleTagChange}
          placeholder="e.g. Laptop, Office, IT"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block font-semibold mb-1">Image URL (optional)</label>
        <input
          type="text"
          name="imageUrl"
          value={formValues.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Public / Private */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isPublic"
          checked={formValues.isPublic}
          onChange={handleChange}
        />
        <label className="font-semibold">Make inventory public</label>
      </div>

      {/* Custom Fields */}
      <div>
        <label className="block font-semibold mb-1">Custom Fields</label>
        <div className="space-y-2">
          {formValues.customFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Field Title"
                value={field.title}
                onChange={(e) => handleCustomFieldChange(index, "title", e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <select
                value={field.type}
                onChange={(e) => handleCustomFieldChange(index, "type", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="SINGLE_LINE">Single-line</option>
                <option value="MULTI_LINE">Multi-line</option>
                <option value="NUMERIC">Numeric</option>
                <option value="DOCUMENT">Document</option>
                <option value="BOOLEAN">Boolean</option>
              </select>
              <button type="button" onClick={() => removeCustomField(index)} className="text-red-600">
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomField}
            className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
          >
            Add Field
          </button>
        </div>
      </div>

      {/* Access Control */}
      <div>
        <label className="block font-semibold mb-1">Write Access Users</label>
        <input
          type="text"
          placeholder="Type username or email and press Enter"
          value={formValues.accessUsersInput}
          onChange={handleAccessUserInput}
          onKeyDown={handleAccessUserKeyDown}
          className="w-full border p-2 rounded"
        />
        <div className="flex flex-wrap mt-2 gap-2">
          {formValues.accessUsers.map((user, i) => (
            <span key={i} className="bg-gray-200 text-gray-800 px-2 py-1 rounded flex items-center gap-1">
              {user}{" "}
              <button type="button" onClick={() => removeAccessUser(i)} className="text-red-600">
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
          Add Inventory
        </button>
      </div>
    </form>
  );
};

export default Inventories;
