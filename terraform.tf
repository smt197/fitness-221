provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "serveur_web" {
  ami           = "ami-05cf1e9f73fbad2e2"
  instance_type = "t3.micro"

  tags = {
    Name = "ubuntu_server"  # ← C'est le nom visible dans AWS
  }
}
