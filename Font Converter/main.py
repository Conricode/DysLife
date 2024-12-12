# Project: Dyslexia-Friendly Font Converter

# 1. Import required libraries
import tkinter as tk
from tkinter import filedialog
from tkinter import ttk
from tkinter.font import Font

# 2. Define the converter class
class DyslexiaFontConverter:
    def __init__(self, root):
        self.root = root
        self.root.title("Dyslexia-Friendly Font Converter")
        
        # Create font options
        self.dyslexic_font = Font(family="OpenDyslexic", size=12)
        self.default_font = Font(family="Arial", size=12)
        
        # Create UI components
        self.text_area = tk.Text(root, font=self.default_font, wrap="word")
        self.text_area.pack(expand=True, fill="both")
        
        # Add toolbar
        self.toolbar = ttk.Frame(root)
        self.toolbar.pack(side="top", fill="x")
        
        # Add buttons
        self.convert_button = ttk.Button(self.toolbar, text="Convert to Dyslexic Font", command=self.apply_dyslexia_font)
        self.convert_button.pack(side="left")
        
        self.save_button = ttk.Button(self.toolbar, text="Save Text", command=self.save_text)
        self.save_button.pack(side="left")
        
        self.load_button = ttk.Button(self.toolbar, text="Load Text File", command=self.load_text_file)
        self.load_button.pack(side="left")
        
    def apply_dyslexia_font(self):
        """Convert the text to dyslexia-friendly font."""
        self.text_area.config(font=self.dyslexic_font)

    def save_text(self):
        """Save text to a file."""
        file_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text Files", "*.txt")])
        if file_path:
            with open(file_path, 'w') as f:
                f.write(self.text_area.get("1.0", tk.END))

    def load_text_file(self):
        """Load a text file into the editor."""
        file_path = filedialog.askopenfilename(filetypes=[("Text Files", "*.txt")])
        if file_path:
            with open(file_path, 'r') as f:
                content = f.read()
                self.text_area.delete("1.0", tk.END)
                self.text_area.insert("1.0", content)

# Main execution
if __name__ == "__main__":
    root = tk.Tk()
    app = DyslexiaFontConverter(root)
    root.mainloop()

# Next Projects
# After this project, I'll work on: 
# 1. Voice-Controlled Task Manager 
# 2. AI Note-Taking Companion 
# 3. Reading Comprehension Assistant 
# 4. AI-Powered Routine Builder 

# For each, we'll create modular and reusable code components.

