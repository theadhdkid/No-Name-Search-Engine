# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: `34.102.37.218`
2. SSH Username: `student`
3. SSH Password or Key:
   - SSH Key: Stored in this folder separately.
4. Database URL or IP and Port:
   - Host: `34.102.37.218`
   - Port: `3306` (MySQL)
5. Database Username: `NNSETeam`
6. Database Password: `NNSEpassword`
7. Database Name: `team_db`
8. Instructions on how to use the above information:

   ### How to SSH into the Server
   1. Open a terminal.
   2. Run the following command:
      ```bash
      ssh -i <path_to_ssh_key> student@34.94.34.117
      ```
   3. If prompted, type "yes" to accept the fingerprint.

   ### How to Connect to MySQL
   1. SSH into the VM first (see above).
   2. Once connected, run:
      ```bash
      mysql -u NNSETeam -p -h 34.102.37.218 -P 3306
      ```
   3. Enter the password: `NNSEpassword`.

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
