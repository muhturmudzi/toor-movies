# Sass File Workflow with Live Sass Compiler

This README explains how to manage Sass files in the `/css` folder, use partials, and compile them into CSS using **Live Sass Compiler** in Visual Studio Code.

## Project Structure

Here’s an example structure for the `/css` folder:

```
/css
  ├── tailwind.scss        // Main file to import all partials
  ├── tailwind.css         // Generated CSS file
  ├── /components          // Folder for component-specific Sass files
      ├── _input.sass      // Example partial file
      ├── ...other files
```

## Steps to Add a New Sass File

### 1. Create a Partial File
- Inside the `/css/components` folder, create a new file with a leading underscore `_` in its name. For example:
  ```
  _input.sass
  ```
- Partial files are not standalone; they are imported into the main `tailwind.scss` file.

### 2. Write Sass Code
- Add your styles to the partial file. Example for `_input.sass`:
  ```sass
  input
    padding: 10px
    border: 1px solid #ccc
    border-radius: 5px
    &:focus
      border-color: #0077ff
  ```

### 3. Import the Partial File in `tailwind.scss`
- Open the `tailwind.scss` file and import your new partial by specifying the correct path:
  ```scss
  @import 'components/input';
  ```
- Example `tailwind.scss` after adding imports:
  ```scss
  @import 'components/input';
  @import 'components/buttons';
  @import 'components/forms';
  ```

### 4. Start Watching Sass Files
- In Visual Studio Code, click the **"Watch Sass"** button in the bottom status bar.
- The Live Sass Compiler will automatically generate a `tailwind.css` file in the `/css` folder.

## Output
- After compiling, the generated CSS file will be located at:
  ```
  /css/tailwind.css
  ```
- This CSS file will include all styles from the imported partials.

## Tips

### Use Nesting
- Take advantage of Sass’s nesting feature to organize your styles more effectively.
  ```sass
  nav
    ul
      list-style: none
      padding: 0
    li
      display: inline-block
      margin-right: 10px
  ```

### Minify CSS for Production
- Update the VS Code settings to output minified CSS for production. Add this to your `settings.json`:
  ```json
  "liveSassCompile.settings.formats": [
    {
      "format": "compressed",
      "extensionName": ".min.css",
      "savePath": null
    }
  ]
  ```

### Organize Files
- Group related styles in separate partial files (e.g., `_buttons.sass`, `_forms.sass`) to improve maintainability.

## Common Issues

### File Not Compiling
- Ensure that your partial file is imported correctly in `tailwind.scss`.

### Watch Button Not Visible
- Restart Visual Studio Code or confirm that the **Live Sass Compiler** extension is installed.

## Additional Notes
- The `tailwind.scss` file is the entry point for compiling Sass into CSS.
- Always save your Sass files after making changes to trigger the compiler.