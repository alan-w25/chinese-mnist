import base64

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_string

if __name__ == "__main__":
    image_path = "ml_model/data/raw/images/input_1_1_15.jpg"  # Update this to the path of your image
    base64_string = encode_image_to_base64(image_path)
    print(f"Base64 Encoded Image:\n{base64_string}")
