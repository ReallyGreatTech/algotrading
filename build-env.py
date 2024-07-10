import sys
import json


def create_env_file(data, env_file_path):
    # Convert JSON data to string
    env_content = "\n".join([f"{key}={value}" for key, value in data.items()])

    # Write the string to the .env file
    with open(env_file_path, "w") as env_file:
        env_file.write(env_content)

    print(f"JSON data has been written to {env_file_path}")


if __name__ == "__main__":
    if len(sys.argv) == 3:
        json_file_path = sys.argv[1]
        env_file_path = sys.argv[2]

        with open(json_file_path, "r") as json_file:
            json_data = json.load(json_file)
            # print(json_data)
            create_env_file(json_data, env_file_path)
    else:
        usage = """
            system arg:
                - json_file_path = "/path-to-file/env.json"
                - env_file_path = "/path-to-file/.env"

            usage:  python3 build-env.py "/path-to-file/env.json" "/path-to-file/.env"
        """
        print(usage)
