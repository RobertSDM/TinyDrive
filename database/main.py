from routes import create_app

def main():
    app = create_app()
    app.run(debug=True, port=4500)

if __name__ == "__main__":
    main()
