import json

# Load your existing JSON data from a file
with open('Originaldatabase.js', 'r', encoding='utf-8') as file:
    content = file.read()
    json_str = content.replace('const songDataBase = ', '').rstrip(';\n')  # Remove JS variable part and trailing semicolon
    data = json.loads(json_str)

# Reformat the JSON data
formatted_data = []
for item in data:
    formatted_item = {
        "songSrc": item["songSrc"],
        "title": item["title"],
        "artist": item["artist"],
        "imgSrc": item["imgSrc"],
        "previewImgSrc": item.get("previewImgSrc", "")  # Use get() to handle missing previewImgSrc safely
    }
    formatted_data.append(formatted_item)

# Save the reformatted JSON back to a JavaScript file
with open('Formatteddatabase.js', 'w', encoding='utf-8') as file:
    file.write('const songDataBase = ')
    json.dump(formatted_data, file, indent=4, ensure_ascii=False)
    file.write(';')

print("JSON has been reformatted and saved with the correct encoding.")
