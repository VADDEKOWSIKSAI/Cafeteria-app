
$jdkPath = "c:\Users\vadde\OneDrive\Desktop\cafeteria\tools\jdk-17.0.17+10\bin"
$mvnPath = "c:\Users\vadde\OneDrive\Desktop\cafeteria\tools\apache-maven-3.9.6\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")

# Check if already in path to avoid duplicates
if ($currentPath -notlike "*$jdkPath*") {
    $currentPath = "$jdkPath;$currentPath"
}
if ($currentPath -notlike "*$mvnPath*") {
    $currentPath = "$mvnPath;$currentPath"
}

[Environment]::SetEnvironmentVariable("Path", $currentPath, "User")
Write-Host "PATH updated successfully. New components added at the beginning."
